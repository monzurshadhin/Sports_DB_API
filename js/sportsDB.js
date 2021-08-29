document.getElementById("search-button").addEventListener("click", () => {
  const inputField = document.getElementById("inputField");
  const inputData = inputField.value;
  inputField.value ='';

  document.getElementById('spinner').classList.remove('d-none');

  console.log(inputData);

  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputData}`;

  getFetchedData(url).then((data) => {
    console.log(data);

    displayData(data.teams);
  });
});

const getFetchedData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  return data;
};
const displayField = document.getElementById("displayField");
const displayData = (datas) => {
  console.log(datas);
  displayField.innerHTML=``;
  displayDetailsField.innerHTML=``;
  document.getElementById('spinner').classList.add('d-none');


  datas.forEach((data) => {
    console.log(data)
   
    
    const div = document.createElement("div");
    div.classList.add("col");

    // //without data destructuring
    // div.innerHTML = `
    //     <div class="card h-100  onclick="displayDeatils('${data.idTeam}')"">
    //     <img src="${data.strTeamBadge}" class="card-img-top" alt="...">
    //     <div class="card-body">
    //       <h5 class="card-title">${data.strGender}</h5>
    //       <p >${data.strDescriptionEN}</p>
    //     </div>
    //   </div>
    //     `;


     //with data destructuring 

    const {strTeam,strTeamBadge,strGender,strDescriptionEN} = data;
    const shortDescription = strDescriptionEN.slice(0,100);
    div.innerHTML = `
        <div class="card h-100" onclick="displayDeatils('${strTeam}')">
        <img src="${strTeamBadge}" class="card-img-top" alt="...">
        <div class="card-body">
        <h2 class="card-title">Team Name:${strTeam}</h2>
          <h5 class="card-title">Gender:${strGender}</h5>
          <p >${shortDescription}</p>
        </div>
      </div>
        `;


        
        displayField.appendChild(div);
  });
}

const displayDeatils = (teamName) =>{
  const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${teamName}`;
  console.log(url);

  getFetchedData(url).then((data) => {
    console.log(data);

    displayDetailsData(data.teams,teamName);
  });

}

const displayDetailsField = document.getElementById("displayDetailsField");
const displayDetailsData = (datas,teamName) => {
  console.log(datas);
  // to scroll to top 
  window.scrollTo(0,40);
  displayDetailsField.innerHTML=``;
  document.getElementById('spinner').classList.add('d-none');


  datas.forEach((data) => {
    console.log(data)
   
    
    const div = document.createElement("div");
    // div.classList.add("mx-auto");

    // //without data destructuring
    // div.innerHTML = `
    //     <div class="card h-100  onclick="displayDeatils('${data.idTeam}')"">
    //     <img src="${data.strTeamBadge}" class="card-img-top" alt="...">
    //     <div class="card-body">
    //       <h5 class="card-title">${data.strGender}</h5>
    //       <p >${data.strDescriptionEN}</p>
    //     </div>
    //   </div>
    //     `;


     //with data destructuring 

    const {strTeam,strTeamBadge,strGender,strDescriptionEN} = data;
    const shortDescription = strDescriptionEN.slice(0,100);
    if(strTeam == teamName){
      div.innerHTML = `
      <div class="card h-100 " onclick="displayDeatils('${strTeam}')">
      <img src="${strTeamBadge}" class="card-img-top" alt="...">
      <div class="card-body">
      <h2 class="card-title">Team Name:${strTeam}</h2>
        <h5 class="card-title">Gender:${strGender}</h5>
        <p >${shortDescription}</p>
      </div>
    </div>
      `;


      
      displayDetailsField.appendChild(div);

    }
  });
}

