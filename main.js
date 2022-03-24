function getData() {
    //1. get data input from forms for selected object/dictionary in api
    let season = document.querySelector('#season').value;
    let round = document.querySelector('#round').value;
    console.log(season, round)
    
    //2. api call - fetch - format in appropriate season and round keys
    // insert javascript variables 'season' and 'round' into apicall @ appropriate place
    //3. promises- .then statements
    fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    .then(response => response.json())
    .then(formula1data =>{
        console.log(formula1data)
        //for loop to get the drivers - 7 rows - i starts @ 0 goes to 6
        for (let i=0; i<7; i++) {
            // points
            let points = formula1data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['points'];
            document.querySelector(`#points-${i}`).innerHTML=points;
            console.log(points)

            // givenName/first_name + familyName/last_name = full_link + wiki link
            let firstname = formula1data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['Driver']['givenName'];
            let last_name = formula1data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['Driver']['familyName'];
            let full_name = firstname + ' ' + last_name
            let driver_wiki = formula1data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['Driver']['url']
            document.querySelector(`#full_name-${i}`).innerHTML=`<a href="${driver_wiki}">${full_name}</a>`;

            // driver_nationality
            let driver_nationality = formula1data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['Driver']['nationality'];
            document.querySelector(`#driver_nationality-${i}`).innerHTML=driver_nationality;

            // sponsor
            let sponsor = formula1data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['Constructors'][0]['name'];
            document.querySelector(`#sponsor-${i}`).innerHTML=sponsor;

            // sponsor team url
            let team_wiki = formula1data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['Constructors'][0]['url'];
            document.querySelector(`#team_wiki-${i}`).innerHTML=`<a href="${team_wiki}">Team Info</a>`;

            // // sponsor nationality
            // let sponsor_nationality = formula1data['MRData']['StandingsTable']['StandingsLists'][0]['DriverStandings'][i]['Constructors'][0]['nationality'];
            // document.querySelector(`#sponsor-nationality-${i}`).innerHTML=sponsor_nationality;
        }
    })

}