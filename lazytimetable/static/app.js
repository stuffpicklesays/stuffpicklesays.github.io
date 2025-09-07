// Static client-side implementation of the timetable calculator
// Adjust this to select which timetable JSON to use
const DEFAULT_TIMETABLE = '10s'; // matches timetables/9s.json

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

function compareSubjects(todays, tomorrows, dayKey, timetable) {
  try {
    const add = [];
    const remove = [];
    const keep = [];

    // preserve ordering similar to server
    for (let i = 0; i < todays.length; i++) {
      if (!tomorrows.includes(todays[i])) {
        remove.push(todays[i]);
      } else {
        keep.push(todays[i]);
      }
    }
    for (let i = 0; i < tomorrows.length; i++) {
      if (!todays.includes(tomorrows[i])) {
        add.push(tomorrows[i]);
      }
    }

    const addStr = add.join(', ');
    const removeStr = remove.join(', ');
    const keepStr = keep.join(', ');

    return `Using ${timetable} timetable. Packing for ${dayKey}:\nAdd: ${addStr}.\nRemove: ${removeStr}.\nKeep: ${keepStr}.`;
  } catch (e) {
    return String(e);
  }
}

async function getInstructions(week, timetable) {
  const res = await fetch(`timetables/${timetable}.json`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load timetable JSON: ${res.status}`);
  const data = await res.json();

  const now = new Date();
  // JS: 0=Sunday..6=Saturday; convert to Python-style Monday=0..Sunday=6
  const jsDay = now.getDay();
  const todayIdx = (jsDay + 6) % 7; // Monday=0
  let todayName = days[todayIdx];
  const tomorrowIdx = (todayIdx + 1) % 7;
  let tomorrowName = days[tomorrowIdx];

  let useWeekForToday = week;

  if (todayName === 'saturday' || todayName === 'sunday') {
    todayName = 'friday';
    // flip week for "today" lookup (matches server logic)
    useWeekForToday = week === 2 ? 1 : 2;
  }
  const todayKey = `${todayName}${useWeekForToday}`;
  const todays = (data[todayKey] && data[todayKey].subjects) || [];

  if (tomorrowName === 'monday' || tomorrowName === 'saturday' || tomorrowName === 'sunday') {
    tomorrowName = 'monday';
  }
  const tomorrowKey = `${tomorrowName}${week}`;
  const tomorrows = (data[tomorrowKey] && data[tomorrowKey].subjects) || [];

  return compareSubjects(todays, tomorrows, tomorrowKey, timetable);
}

async function runFunction(arg) {
  const week = arg === 'arg1' ? 1 : 2;
  try {
    const result = await getInstructions(week, DEFAULT_TIMETABLE);
    const el = document.getElementById('result');
    if (el) el.innerText = result;
  } catch (e) {
    const el = document.getElementById('result');
    if (el) el.innerText = `Error: ${e.message}`;
  }
}

// Wire buttons on load
window.addEventListener('DOMContentLoaded', () => {
  const btn1 = document.getElementById('myButton1');
  const btn2 = document.getElementById('myButton2');
  if (btn1) btn1.addEventListener('click', () => runFunction('arg1'));
  if (btn2) btn2.addEventListener('click', () => runFunction('arg2'));
});



