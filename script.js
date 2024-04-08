document.addEventListener("DOMContentLoaded", function() {
  const notesContainer = document.getElementById('notes-container');
  const noteInput = document.getElementById('note-input');
  const saveBtn = document.getElementById('save-btn');
 
  loadNotes();

  saveBtn.addEventListener('click', function() {
    const noteText = noteInput.value.trim();
    if (noteText !== '') {
      const note = {
        text: noteText,
        timestamp: new Date().toLocaleString()
      };
      saveNoteToLocalStorage(note);
      noteInput.value = '';
      loadNotes();
    } else {
      alert('Please enter a note.');
    }
  });

 
  function loadNotes() {
    notesContainer.innerHTML = '';
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(function(note, index) {
      const noteElement = document.createElement('div');
      noteElement.classList.add('note');
      noteElement.innerHTML = `
        <p>${note.text}</p>
        <small>${note.timestamp}</small>
        <button class="edit-btn" data-index="${index}">Upravit</button>
        <button class="delete-btn" data-index="${index}">Vymazat</button>
      `;
      notesContainer.appendChild(noteElement);
    });

   
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const index = parseInt(btn.getAttribute('data-index'));
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const editedNote = prompt('Edit note:', notes[index].text);
        if (editedNote !== null) {
          notes[index].text = editedNote.trim();
          notes[index].timestamp = new Date().toLocaleString();
          localStorage.setItem('notes', JSON.stringify(notes));
          loadNotes();
        }
      });
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const index = parseInt(btn.getAttribute('data-index'));
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
      });
    });
  }

 
  function saveNoteToLocalStorage(note) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
  }
});
   
