var city=document.querySelector('.city');
var btn=document.querySelector('.submit');
var cityname=document.querySelector('.cityname');
var temp=document.querySelector('.temp');
var desc=document.querySelector('.desc');
//var charttype1=document.querySelector('#charttype').selectedOption[0].text;


async function weatherData(){
    let response = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='+city.value+'&appid=43bf0725bbf0e009a4ca99baacf89d66&units=metric')
    let data=await response.json();
    let weatherArray=data.list;
    let xs=[];
    let ys=[];
    for(let i=0;i<weatherArray.length;i=i+8){
        xs.push(new Date(weatherArray[i].dt_txt).getDate());
        ys.push(weatherArray[i].main.temp);
    }
    return {xs,ys};
}
async function weatherchart(){
    let weatherDetails=await weatherData();

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: weatherDetails.xs,
        datasets: [{
            label: '# of Votes',
            data: weatherDetails.ys,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}