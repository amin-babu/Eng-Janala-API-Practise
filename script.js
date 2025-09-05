const loadLesson = () => {
  const url = `https://openapi.programming-hero.com/api/levels/all`;
  fetch(url).then(res => res.json()).then(data => displaylessonBtn(data.data));
}

const displaylessonBtn = (lessons) => {
  const buttonContainer = document.getElementById('button-container');
  buttonContainer.innerHTML = '';

  lessons.forEach(lesson => {
    const btnDiv = document.createElement('div');
    btnDiv.innerHTML = `
      <button class="btn btn-outline btn-primary mb-5"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
    `;
    buttonContainer.appendChild(btnDiv);
  })
}

loadLesson();