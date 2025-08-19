#!/usr/bin/env bash

# API Test & Visualization Script
#
# This script will:
# 1. Start the Node.js server in the background.
# 2. Wait for the server to initialize.
# 3. Run a full suite of API tests, capturing results.
# 4. Write the results to a `test_results.js` file.
# 5. Automatically shut down the server.
# 6. Open the `api_test_visualizer.html` dashboard in the browser.

# --- Configuration ---
BASE_URL="http://localhost:3000/api/posts"
RESULTS_FILE="test_results.js"
DASHBOARD_FILE="dashboard.html"

# Use jq for pretty printing JSON if available
PRETTY_PRINT_CMD="jq ."
if ! command -v jq &> /dev/null
then
    echo "jq could not be found, JSON output will not be pretty-printed."
    PRETTY_PRINT_CMD="cat"
fi

# --- Server Management ---
SERVER_PID=""

# Function to clean up and kill the server process
cleanup() {
    echo ""
    echo "---"
    echo "Cleaning up and stopping the server..."
    if [ -n "$SERVER_PID" ]; then
        kill $SERVER_PID
    fi
}

# Trap the script's exit to ensure cleanup runs
trap cleanup EXIT

echo "Starting the Node.js server in the background..."
npm start &
SERVER_PID=$!

echo "Server started with PID: $SERVER_PID"
echo "Waiting for server to initialize..."
sleep 3 # Give the server a moment to start up

# --- JSON Generation Helpers ---
FIRST_CATEGORY=true
FIRST_TEST=true

# Function to start a new test category in the JSON output
start_category() {
    if [ "$FIRST_CATEGORY" = false ]; then
        echo "]}," >> "$RESULTS_FILE"
    fi
    echo "{ \"category\": \"$1\", \"tests\": [" >> "$RESULTS_FILE"
    FIRST_TEST=true
    FIRST_CATEGORY=false
}

# Function to run a test and record its result in JSON format
# Arguments: description, method, endpoint, expected_status, [data]
run_test() {
    local description="$1"
    local method="$2"
    local endpoint="$3"
    local expected_status="$4"
    local data="$5"
    
    echo "  - Running: $description"

    local curl_args=(-s -w "%{http_code}" -o /dev/null)
    curl_args+=(-X "$method")
    
    if [ -n "$data" ]; then
        curl_args+=(-H "Content-Type: application/json" -d "$data")
    fi

    local http_status=$(curl "${curl_args[@]}" "$BASE_URL$endpoint")
    local status="failed"
    local reason=""

    if [ "$http_status" -eq "$expected_status" ]; then
        status="passed"
    else
        reason="Expected status $expected_status, but got $http_status"
    fi

    if [ "$FIRST_TEST" = false ]; then
        echo "," >> "$RESULTS_FILE"
    fi

    # Build the JSON object for the test result
    printf '{"description": "%s", "method": "%s", "endpoint": "%s", "status": "%s", "expected": "%s", "reason": "%s"}' \
        "$description" "$method" "$endpoint" "$status" "$expected_status" "$reason" >> "$RESULTS_FILE"

    FIRST_TEST=false
}

# --- Test Execution ---
echo "Running API tests..."

# Initialize results file
echo "const testSuite = [" > "$RESULTS_FILE"

# 1. CREATE Posts
start_category "1. Testing POST /api/posts (Create Posts)"
RESPONSE_1_JSON=$(curl -s -X POST "$BASE_URL" -H "Content-Type: application/json" -d '{"title": "Exploring the Alps", "content": "A beautiful journey...", "author": "Jane Doe"}')
POST_ID_1=$(echo "$RESPONSE_1_JSON" | jq -r '.data.id')
run_test "Creating Post 1 (Valid Data)" "POST" "" 201 '{"title": "Exploring the Alps", "content": "A beautiful journey...", "author": "Jane Doe"}'
run_test "Creating Post 2 (Valid Data)" "POST" "" 201 '{"title": "A Guide to Modern JavaScript", "content": "ES6+ features...", "author": "John Smith"}'
run_test "Attempting to create a post with invalid data" "POST" "" 400 '{"title": "Hi", "content": "Short."}'

# 2. READ Posts
start_category "2. Testing GET /api/posts (Read All Posts)"
run_test "Fetching all posts" "GET" "" 200
run_test "Fetching posts with pagination" "GET" "?page=1&limit=1" 200
run_test "Searching for posts" "GET" "?q=javascript" 200

# 3. READ Post by ID
start_category "3. Testing GET /api/posts/:id (Read Single Post)"
if [ -z "$POST_ID_1" ] || [ "$POST_ID_1" == "null" ]; then
    echo "SKIPPING tests that require Post 1 ID."
else
    run_test "Fetching Post 1 by ID" "GET" "/$POST_ID_1" 200
fi
run_test "Attempting to fetch a non-existent post" "GET" "/non-existent-id" 404

# 4. UPDATE Post
start_category "4. Testing PUT /api/posts/:id (Update Post)"
if [ -z "$POST_ID_1" ] || [ "$POST_ID_1" == "null" ]; then
    echo "SKIPPING tests that require Post 1 ID."
else
    run_test "Updating Post 1" "PUT" "/$POST_ID_1" 200 '{"title": "Updated Journey into the Alps"}'
fi

# 5. DELETE Post
start_category "5. Testing DELETE /api/posts/:id (Delete Post)"
if [ -z "$POST_ID_1" ] || [ "$POST_ID_1" == "null" ]; then
    echo "SKIPPING tests that require Post 1 ID."
else
    run_test "Deleting Post 1" "DELETE" "/$POST_ID_1" 204
    run_test "Verifying deletion by fetching again" "GET" "/$POST_ID_1" 404
fi

# Finalize JSON file
echo "]}]" >> "$RESULTS_FILE"
echo "Test results saved to $RESULTS_FILE"

# --- Shutdown and Launch ---
cleanup # Explicitly call cleanup to stop the server

echo "API Testing Complete!"
echo "Opening dashboard in your browser..."

# Open the HTML file in a cross-platform way
case "$(uname -s)" in
   Darwin) open "$DASHBOARD_FILE" ;;
   Linux)  xdg-open "$DASHBOARD_FILE" ;;
   CYGWIN*|MINGW*|MSYS*) start "$DASHBOARD_FILE" ;;
   *) echo "Could not detect OS to open browser. Please open '$DASHBOARD_FILE' manually." ;;
esac

exit 0
