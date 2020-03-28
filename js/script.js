// API nyckel: 19d3e6e0acfe9c438f368e2c2bab1c5d



//click search button
document.querySelector('.seek').addEventListener('click', async()=>{
    //getImages
    let text = document.querySelector('#search').value;
    let number= document.querySelector('#number').value;
    let data = await getImages(text,number);

    //update
     update(data) 

});     

//enter keyboard button
document.getElementById("search").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("enter").click();
       }
});

document.getElementById("number").addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
         event.preventDefault();
         document.getElementById("enter").click();
        }
});


async function getImages(text,number){
    const apiKey = '19d3e6e0acfe9c438f368e2c2bab1c5d';
    const baseUrl = 'https://api.flickr.com/services/rest';
    let method = 'flickr.photos.search';
    let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&per_page=${number}&format=json&nojsoncallback=1`;

    let resp = await fetch(url);
    let data = await resp.json();
    return data.photos; 

}

function update(data){
    document.querySelector('#photos').innerHTML ='';
    
    data.photo.forEach(img => {
        let elem = document.createElement('img');
        elem.setAttribute('src',imgURL(img ,'q'));

        //click on image and change size
        elem.addEventListener('click', () => {
            enlarge(img);
        });
        document.querySelector('#photos').appendChild(elem);
        
    });
}


// enlarge function for click the image
function enlarge(obj){
    const selectedImage = document.getElementById('selectedImage');
    selectedImage.innerHTML = '';
    let img = document.createElement('img');
    //make a close button
    let cross = document.createElement('button');
    cross.setAttribute('class', 'closeImage');
    cross.innerHTML = 'x';
    img.setAttribute('src',imgURL(obj ,'z'));
    selectedImage.appendChild(img);
    selectedImage.appendChild(cross);
    selectedImage.style.display = 'flex';
    //click to close big image
    cross.addEventListener('click', ()=>{
        selectedImage.style.display = 'none';
    });
   
}



function imgURL(img , size){
    return `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${size}.jpg`;
}

