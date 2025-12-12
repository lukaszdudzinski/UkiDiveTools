import urllib.request
import sys

def check_url(url):
    try:
        with urllib.request.urlopen(url) as response:
            if response.status == 200:
                print(f"[OK] {url} is UP and reachable.")
                return True
            else:
                print(f"[FAIL] {url} returned status {response.status}")
                return False
    except Exception as e:
        print(f"[ERROR] {url} failed: {e}")
        return False

print("Verifying Local Server...")
u1 = check_url("http://127.0.0.1:8081/index.html")
u2 = check_url("http://localhost:8081/index.html")

if u1 or u2:
    print("Server is functioning correctly.")
    sys.exit(0)
else:
    print("Server seems down or unreachable.")
    sys.exit(1)
