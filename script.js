window.addEventListener('load',function(){
    this.fetch('https://ipinfo.io/json')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var ip = data.ip;
        document.getElementById('ip-address').textContent=ip;
    })
    .catch(function(error){
        console.log(error);
    });
})
const info= document.getElementById('info');
const button= document.getElementById("get-data");
const input = document.createElement("input");

button.addEventListener('click',function dataInfo(){
    fetch('https://ipinfo.io/json')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        var location=data.loc.split(',');
        var lat = parseFloat(location[0]);
        var long=parseFloat(location[1]);
        var city= data.city;
        var organisation =data.org;
        var region = data.region;
        var hostName=data.hostname;
        var pincode=data.postal;
        var timeZone= data.timezone;
        const details = document.createElement("div");
        details.classList.add('detail');
        const details1 = document.createElement("div");
        const details2 = document.createElement("div");
        details1.classList.add("details");
        details2.classList.add("details");
        details1.innerHTML=`
           <li><b>Lat:</b> ${lat}</li>
           <li><b>City:</b> ${city}</li>
           <li><b>Organistion:</b> ${organisation}</li>
        `;
        details2.innerHTML=`
        <li><b>long:</b> ${long}</li>
        <li><b>Region:</b> ${region}</li>
        <li><b>Hostname:</b> ${hostName}</li>
     `;

     details.append(details1);
     details.append(details2);
     const map = document.createElement("div");
     const mapURL = `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;
     map.innerHTML = `<iframe src="${mapURL}" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>`;
     details.append(map);
     map.style.marginTop="3%";

     var postalUrl = `https://api.postalpincode.in/pincode/${pincode}`
        fetch(postalUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data[0].Message);
            const box =  document.createElement("div");
            var currentTime = getCurrentTimeInTimeZone(data.timezone).split(",");
        
            box.innerHTML=
            ` <p><b>TimeZone:</b> ${timeZone}</p>
              <p><b>Date:</b> ${currentTime[0]}</p>
              <p><b>Time:</b> ${currentTime[1]}</p>
              <p><b>Pincode:</b>  ${pincode}</p>
              <p><b>${data[0].Message}</b></p>
            `;
            box.style.marginTop="2%";
            details.append(box);
            input.classList.add("your-class");
            input.placeholder = "\uD83D\uDD0E filter";

            input.style.width="96%";
            input.style.padding='10px';
            input.style.border="2px solid black";
            input.style.borderRadius="8px"; 
            input.style.marginTop="3%"
                
            details.append(input);
            var postOffices = data[0].PostOffice;
            var postOfficesList = document.createElement('div');
            postOfficesList.setAttribute("id","grid");
            postOfficesList.style.marginTop="2%";

            postOfficesList.innerHTML = '';
        
            postOffices.forEach(function(postOffice) {
                    var d = document.createElement('div');
                    d.setAttribute("id","postoffice")
                    d.innerHTML=`
                    <p> <b>Name:</b> ${postOffice.Name}</p>
                    <p> <b>Branch:</b> ${postOffice.BranchType}</p>
                    <p> <b>DeliveryStatus:</b> ${postOffice.DeliveryStatus} </p>
                    <p> <b>Division:</b> ${postOffice.Division}</p>
                    <p> <b>District:</b> ${postOffice.District}</p>
                    `
                    d.style.border="2px solid black";
                    d.style.padding="10px";
                    d.style.borderRadius="4px"
                    postOfficesList.appendChild(d);
            });
            details.append(postOfficesList);
        })
        .catch(function(error){
            console.log(error);
        })

     info.append(details);

    })
    .catch(function(error){
        console.log(error);
    });
    input.addEventListener('input', function() {
        var filter = input.value.toUpperCase();
        var postOffices = document.querySelectorAll('#postoffice');
        
        postOffices.forEach(function(postOffice) {
          var name = postOffice.querySelector('p:nth-child(1)').textContent.toUpperCase();
          var branch = postOffice.querySelector('p:nth-child(2)').textContent.toUpperCase();
          
          if (name.includes(filter) || branch.includes(filter)) {
            postOffice.style.display = 'block';
          } else {
            postOffice.style.display = 'none';
          }
        });
    });
    button.style.display="none";    
}
);
function getCurrentTimeInTimeZone(timezone) {
    const options = {
      timeZone: timezone,
      hour12: false,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(new Date());
}
