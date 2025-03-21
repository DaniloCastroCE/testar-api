const inp = document.querySelector(`#input`)

const checkWidthInp = () => {
    const padrao = {min: 200, max: 500}
    const widthTela = window.innerWidth
    const width = inp.value.length * 8

    //console.log(widthElemento)

    if (width <= padrao.min || widthTela < 420){
        inp.style.width = padrao.min + "px"
    }else if(width <= padrao.max) {
        inp.style.width = width + "px"
    } else {
        inp.style.width = padrao.max + "px"
    }
}

const clickBtn = () => {
    const url = inp.value.trim()
    
    if(url){
        try {
            getApi(url, (result) => {
                const painel = document.querySelector('#painel')
                const txt = JSON.stringify(result, null, 2)
                painel.innerHTML = txt.replace(/\n/g, '<br>').replace(/\{/g, '{<br>').replace(/\}/g, '}<br>')
                
            })
        } catch (err) {
            console.error(err)
            //throw new Error('Erro ao tentar acessar o arquivo local devido a CORS');
        }
    }
}

const clear = () => {
    document.querySelector('#painel').innerHTML = ""
    inp.value = ""
}

document.querySelector("#clear").addEventListener('click', () => clear())

const getApi = async (url, callback) => {
    try {
        const response = await fetch(url)

        if(!response.ok){
            throw new Error('Erro na requisição da api')
        }

        const data = await response.json()
        console.log(data)
        callback(data)

    } catch (err) {
        console.error(err)
    }
}

document.querySelector('#input').addEventListener('input', () => checkWidthInp())
window.addEventListener('resize', () => checkWidthInp('input'))
document.querySelector('#get').addEventListener('click', () => clickBtn())