const resumeDetails = document.getElementById("resume");
const searchBar = document.getElementById("searchBar");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
let resumesList = [];
let filteredResumesList = [];
let pageNum = 0;
//var json = require('./Data.json');

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredResumes = resumesList.filter((resume) => {
    return resume.basics.AppliedFor.toLowerCase().includes(searchString);
  });
  if (filteredResumes.length > 0) {
    filteredResumesList = filteredResumes;
    displayResume(filteredResumesList, 0);
  } else {
    resumeDetails.innerHTML = `
        <div class="card">        
        <p> &#128532;  No such results found</p>
    </div>
        `;
  }
});

const loadCharacters = async () => {
  try {
    // const res = await fetch('https://hp-api.herokuapp.com/api/characters');
    //const res =  require('./Data.json');
    var request = new XMLHttpRequest();
    request.open("GET", "./Data.json", false);
    request.send(null);
    resumes = JSON.parse(request.responseText);
    resumesList = resumes["resume"];
    filteredResumesList = resumes["resume"];
    displayResume(resumes["resume"], pageNum);
  } catch (err) {
    console.error(err);
  }
};

const displayResume = (resumes, pageNum) => {
  const resumeToDisplay = resumes[pageNum];
  //console.log(resumes[pageNum]);
  // const htmlString =
  //          `
  //         <li class="character">
  //             <div>
  //                 <p>John Doe</p>
  //                 <p>Applied For: Software Engineer</p>
  //             </div>
  //             <h2>${character.name}</h2>
  //             <p>House: ${character.house}</p>
  //             <img src="${character.image}"></img>
  //         </li>
  //     `;

  const techinalSkills = resumeToDisplay.skills.keywords;
  const techinalSkillsHtml = techinalSkills
    .map(function (element) {
      return "<li>" + element + "</li>";
    })
    .join("");

  const hobbies = resumeToDisplay.interests.hobbies;
  const hobbiesHtml = hobbies
    .map(function (element) {
      return "<li>" + element + "</li>";
    })
    .join("");

  const acheivements = resumeToDisplay.achievements.Summary;
  const acheivementsHtml = acheivements
    .map(function (element) {
      return "<li>" + element + "</li>";
    })
    .join("");

  const resumeHTML =
    `
    <div id="header">
    <p id="name">${resumeToDisplay.basics.name}</p>
    <p id="role">Applied For: ${resumeToDisplay.basics.AppliedFor}</p>
  </div>
  <div class="float-container">
  <div class="left-side" style="background-color: lightpink">
    <h3 style="background-color: grey">Personal Information</h3>
    <div class="right">
      <p>${resumeToDisplay.basics.phone}</p>
      <p>${resumeToDisplay.basics.email}</p>
      <a href=${resumeToDisplay.basics.profiles.url}>${resumeToDisplay.basics.profiles.network}</a>
    </div>
    <div id="ts">
      <h3 style="background-color: grey">Technical Skills</h3>
      <div class="right">
        <ul class="list">
          ` +
    techinalSkillsHtml +
    `
        </ul>
      </div>
    </div>
    <div id="hb">
      <h3 style="background-color: grey">Hobbies</h3>
      <div class="right">
        <ul class="list">
            ` +
    hobbiesHtml +
    `
        </ul>
      </div>
    </div>
  </div>
  <div class="right-side" style="background-color:blanchedalmond;">
      <div id="experience">
          <h2 class="title-left">Work experience in previous company</h2>
          <p class="content-left-margin"><b>Company Name:</b> ${resumeToDisplay.work["Company Name"]}</p>
          <p class="content-left-margin"><b>Position:</b> ${resumeToDisplay.work.Position}</p>
          <p class="content-left-margin"><b>Start Date:</b> ${resumeToDisplay.work["Start Date"]}</p>
          <p class="content-left-margin"><b>End Date:</b> ${resumeToDisplay.work["End Date"]}</p>
          <p class="content-left-margin"><b>Summary:</b> ${resumeToDisplay.work.Summary}</p>
      </div>
      <div id="projects">
          <h2 class="title-left">Projects</h2>
          <p class="content-left-margin"><b> ${resumeToDisplay.projects.name}</b> ${resumeToDisplay.projects.description}</p>           
      </div>
      <div id="education">
          <h2 class="title-left">Education</h2>
          <p class="content-left-margin"><b>UG:</b>  ${resumeToDisplay.education.UG.institute}, ${resumeToDisplay.education.UG.course}, ${resumeToDisplay.education.UG["Start Date"]}, ${resumeToDisplay.education.UG["End Date"]}, ${resumeToDisplay.education.UG.cgpa}</p>
          <p class="content-left-margin"><b>PU:</b> ${resumeToDisplay.education["Senior Secondary"].institute}, ${resumeToDisplay.education["Senior Secondary"].cgpa}</p>
          <p class="content-left-margin"><b>High School:</b> ${resumeToDisplay.education["High School"].institute}, ${resumeToDisplay.education["High School"].cgpa}</p>            
      </div>
      <div id="internship">
          <h2 class="title-left">Internship</h2>
          <p class="content-left-margin"><b>Company Name:</b> ${resumeToDisplay.Internship["Company Name"]}</p>
          <p class="content-left-margin"><b>Position:</b>  ${resumeToDisplay.Internship.Position}</p>
          <p class="content-left-margin"><b>Start Date:</b> ${resumeToDisplay.Internship["Start Date"]}</p>
          <p class="content-left-margin"><b>End Date:</b> ${resumeToDisplay.Internship["Start Date"]}</p>
          <p class="content-left-margin"><b>Summary:</b> ${resumeToDisplay.Internship.Summary}</p>
      </div>
      <div id="acheivements">
          <h2 class="title-left">Acheivements</h2>
          <ul>
              ` +
    acheivementsHtml +
    `
          </ul>
         
      </div>
  </div>
</div>
    `;
  resumeDetails.innerHTML = resumeHTML;
};

function previous() {
  if (pageNum - 1 >= 0) {
    pageNum--;
    console.log("prev-" + pageNum);
    displayResume(filteredResumesList, pageNum);
    nextBtn.style.visibility="visible";
  }
  if(pageNum==0)
  {
    previousBtn.style.visibility="hidden";
  }
}

function next() {
  if (pageNum + 1 < filteredResumesList.length) {
    pageNum++;
    console.log("next-" + pageNum);
    displayResume(filteredResumesList, pageNum);
    previousBtn.style.visibility="visible";
  }
  if(pageNum==filteredResumesList.length-1)
  {
    nextBtn.style.visibility="hidden";
  }
}

loadCharacters();
