# app.py
import os
import csv
from datetime import datetime
from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_folder='static', template_folder='templates')

# Basic user/project info (pre-filled from your input)
PORTFOLIO_META = {
    "full_name": "Gaikavati Manideep",
    "tagline": "B.Tech CSE (Cyber Security) Student | Aspiring Software Developer",
    "email": "manideepg2005@gmail.com",
    "phone": "+91 7671997389",
    "linkedin": "https://www.linkedin.com/in/manideep-gaikvati-9aa86634a",
    "github": "https://github.com/manideep7781"
}

DATA_DIR = 'data'
os.makedirs(DATA_DIR, exist_ok=True)
CONTACTS_CSV = os.path.join(DATA_DIR, 'contacts.csv')

def save_contact(name, email, message):
    exists = os.path.exists(CONTACTS_CSV)
    with open(CONTACTS_CSV, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        if not exists:
            writer.writerow(['timestamp','name','email','message'])
        writer.writerow([datetime.utcnow().isoformat(), name, email, message])

@app.route('/')
def index():
    return render_template('index.html', meta=PORTFOLIO_META)

@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json() or {}
        name = data.get('name','').strip()
        email = data.get('email','').strip()
        message = data.get('message','').strip()
        if not (name and email and message):
            return jsonify({"ok": False, "error": "All fields required."}), 400
        save_contact(name, email, message)
        return jsonify({"ok": True, "message": "Thanks — message received!"})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
