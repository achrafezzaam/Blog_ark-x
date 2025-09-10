const testSuite = [
{ "category": "1. Testing POST /api/posts (Create Posts)", "tests": [
{"description": "Creating Post 1 (Valid Data)", "method": "POST", "endpoint": "", "status": "passed", "expected": "201", "reason": ""},
{"description": "Creating Post 2 (Valid Data)", "method": "POST", "endpoint": "", "status": "passed", "expected": "201", "reason": ""},
{"description": "Attempting to create a post with invalid data", "method": "POST", "endpoint": "", "status": "passed", "expected": "400", "reason": ""}]},
{ "category": "2. Testing GET /api/posts (Read All Posts)", "tests": [
{"description": "Fetching all posts", "method": "GET", "endpoint": "", "status": "passed", "expected": "200", "reason": ""},
{"description": "Fetching posts with pagination", "method": "GET", "endpoint": "?page=1&limit=1", "status": "passed", "expected": "200", "reason": ""},
{"description": "Searching for posts", "method": "GET", "endpoint": "?q=javascript", "status": "passed", "expected": "200", "reason": ""}]},
{ "category": "3. Testing GET /api/posts/:id (Read Single Post)", "tests": [
{"description": "Fetching Post 1 by ID", "method": "GET", "endpoint": "/0f9f81b6-0762-4b89-8527-701a241276d8", "status": "passed", "expected": "200", "reason": ""},
{"description": "Attempting to fetch a non-existent post", "method": "GET", "endpoint": "/non-existent-id", "status": "passed", "expected": "404", "reason": ""}]},
{ "category": "4. Testing PUT /api/posts/:id (Update Post)", "tests": [
{"description": "Updating Post 1", "method": "PUT", "endpoint": "/0f9f81b6-0762-4b89-8527-701a241276d8", "status": "passed", "expected": "200", "reason": ""}]},
{ "category": "5. Testing DELETE /api/posts/:id (Delete Post)", "tests": [
{"description": "Deleting Post 1", "method": "DELETE", "endpoint": "/0f9f81b6-0762-4b89-8527-701a241276d8", "status": "passed", "expected": "204", "reason": ""},
{"description": "Verifying deletion by fetching again", "method": "GET", "endpoint": "/0f9f81b6-0762-4b89-8527-701a241276d8", "status": "passed", "expected": "404", "reason": ""}]}]
