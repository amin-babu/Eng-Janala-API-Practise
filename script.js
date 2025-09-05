// fetching lebel/button data
const loadLesson = () => {
  const url = `https://openapi.programming-hero.com/api/levels/all`;
  fetch(url).then(res => res.json()).then(data => displaylessonBtn(data.data));
}

// showing the lebel/button data to UI
const displaylessonBtn = (lessons) => {
  const buttonContainer = document.getElementById('button-container');
  buttonContainer.innerHTbML = '';

  lessons.forEach(lesson => {
    buttonContainer.innerHTML += `
      <button id="lael-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary mb-5"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
    `;
  })
}

// Invoking all lesson buttons
loadLesson();

// fetching every lesson/button data
const loadLevelWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url).then(res => res.json()).then(data => {
    // call this function to remove active class from all buttons  
    removeActive();

    // then add active class on selected button
    const labelBtn = document.getElementById(`lael-btn-${id}`);
    labelBtn.classList.add('active');
    displayLabelWords(data.data);
  });
}

// remove active class from all buttons
const removeActive = () => {
  const lessonBtns = document.querySelectorAll('#button-container button');
  lessonBtns.forEach(btn => btn.classList.remove('active'));
}

// Showing all words of every lebel/button to UI
const displayLabelWords = (words) => {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';

  if(words.length === 0){
    wordContainer.innerHTML = `
      <div class="space-y-2 col-span-full py-8">
        <img class="mx-auto" src="./assets/alert-error.png" alt="">
        <p class="font-bangla text-center">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h4 class="font-bangla text-center text-4xl font-bold">নেক্সট Lesson এ যান</h4>
      </div>
    `;
    return;
  }
  words.forEach(word => {
    wordContainer.innerHTML += `
      <div class="card bg-white py-8 px-6 text-center space-y-4 rounded-md">
        <h4 class="text-2xl font-bold">${word.word}</h4>
        <p class="font-medium">Meaning / Pronunciation</p>
        <p class="font-bangla font-semibold text-[#18181B] text-3xl">${word.meaning ? word.meaning : 'Meaning Not Found'} / ${word.pronunciation ? word.pronunciation : 'Pronunciation not Found'}</p>
        <div class="flex justify-between">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] text-[#374957]"><i
              class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#1A91FF10] text-[#374957]"><i
              class="fa-solid fa-volume-high"></i></button>
        </div>
      </div>
    `;
  });
}

// fetching word details data
const loadWordDetail = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url).then(res => res.json()).then(wordInfo => {
    displayWordDetails(wordInfo.data);
  });
}

// showing word detils on the modal
const displayWordDetails = (wordDetails) => {
  const wordDetailContainer = document.getElementById('word-detail-container');
  wordDetailContainer.innerHTML = `
      <div class="border-1 border-[#EDF7FF] rounded-md p-3 space-y-4">
        <h2 class="font-semibold text-2xl">${wordDetails.word} (<i class="fa-solid fa-microphone-lines"></i> :${wordDetails.pronunciation})</h2>
        <div class="space-y-1">
          <p class="font-semibold">Meaning</p>
          <p class="font-bangla font-medium">${wordDetails.meaning}</p>
        </div>
        <div class="space-y-1">
          <p class="font-semibold">Example</p>
          <p>${wordDetails.sentence}</p>
        </div>
        <div class="space-y-1">
          <p class="font-bangla font-medium">সমার্থক শব্দ গুলো</p>
          <div>${createElement(wordDetails.synonyms)}</div>
        </div>
      </div>
      <div class="modal-action justify-start mt-3">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-primary text-white font-medium rounded-xl">Complete Learning</button>
        </form>
      </div>
  `;
  document.getElementById('word_modal').showModal();
}

// returning synonyms words to modal synonyms section
const createElement = (synonyms) => {
  const htmlElements = synonyms.map(word => `<button class="btn bg-[#EDF7FF] font-normal border-[#D7E4EF]">${word}</button>`);
  return htmlElements.join(' ');
}