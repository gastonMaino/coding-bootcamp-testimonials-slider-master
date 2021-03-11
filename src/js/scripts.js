const buttons = document.getElementById('buttons')
// const containers = document.querySelectorAll('.container')

const removeClass = (element) => {
    element.classList.remove('container--active')
}

buttons.addEventListener('click', (e) =>{
    if(e.target.classList.contains('container-buttons__button')){
        // containers.forEach((item) =>{
        //     item.classList.remove('container--active')
        // })
        if(e.target.dataset.type == 0){
            if(e.target.parentElement.parentElement.children[1].matches('.container--active')){
                removeClass(e.target.parentElement.parentElement.children[1])
            }
            e.target.parentElement.parentElement.children[0].classList.add('container--active')
        }
        if(e.target.dataset.type == 1){
            if(e.target.parentElement.parentElement.children[0].matches('.container--active')){
                removeClass(e.target.parentElement.parentElement.children[0])
            }
            e.target.parentElement.parentElement.children[1].classList.add('container--active')
        }
    }
})