 # LazyTimetableWebsite (Static)
 
 This repo is a fully static version of the timetable calculator, ready for GitHub Pages.
 
 How it works
 - Open `index.html` and click Week 1 or Week 2.
 - Client-side JS (`static/app.js`) loads `timetables/<name>.json` and computes what to Add/Remove/Keep for tomorrow.
 - No server or Python required.
 
 Configure your timetable
 - Set the default file name in `static/app.js` by editing:
   - `const DEFAULT_TIMETABLE = '8k';`
 - Ensure a matching JSON file exists at `timetables/8k.json` (or your chosen name) using this structure:
 
 ```
 {
   "monday1":   { "subjects": ["Maths", "English", "Biology", "PE", "History"] },
   "tuesday1":  { "subjects": ["Chemistry", "Geography", "Maths", "Art", "ICT"] },
   "wednesday1":{ "subjects": ["Physics", "English", "Drama", "RE", "Music"] },
   "thursday1": { "subjects": ["Maths", "French", "Biology", "PE", "History"] },
   "friday1":   { "subjects": ["Chemistry", "Geography", "Maths", "Art", "ICT"] },
 
   "monday2":   { "subjects": ["Maths", "English", "Physics", "PE", "History"] },
   "tuesday2":  { "subjects": ["Chemistry", "Geography", "Maths", "Art", "ICT"] },
   "wednesday2":{ "subjects": ["Biology", "English", "Drama", "RE", "Music"] },
   "thursday2": { "subjects": ["Maths", "French", "Physics", "PE", "History"] },
   "friday2":   { "subjects": ["Chemistry", "Geography", "Maths", "Art", "ICT"] }
 }
 ```
 
 Local preview (optional)
 - Use any static server to avoid fetch() restrictions on file:// URLs.
 - For example (Python 3):
 
 ```bash
 python -m http.server 8000
 ```
 
 Then open http://localhost:8000/
 
 Deploy to GitHub Pages
 - Commit and push to your repo.
 - In GitHub repo settings → Pages, set Source to “Deploy from a branch”.
 - Choose your branch (e.g., `Static` or `main`) and the root folder `/`.
 - Save. Your site will be available at `https://<user>.github.io/<repo>/`.
 
 Notes
 - Weather icon feature and login have been removed to keep the site fully static.
 - Subject comparison is case-sensitive; keep names consistent across days.