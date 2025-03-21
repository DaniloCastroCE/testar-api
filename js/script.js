const inp = document.querySelector(`#input`)
let addStatus = false
const textareaAddText = document.querySelector('#textareaAddText')

const checkWidthInp = () => {
    const padrao = { min: 200, max: 500 }
    const widthTela = window.innerWidth
    const width = inp.value.length * 8

    //console.log(widthElemento)

    if (width <= padrao.min || widthTela < 420) {
        inp.style.width = padrao.min + "px"
    } else if (width <= padrao.max) {
        inp.style.width = width + "px"
    } else {
        inp.style.width = padrao.max + "px"
    }
}

const clickBtn = () => {
    const url = inp.value.trim()

    if (url) {
        try {

            getApi(url, (result) => {
                const painel = document.querySelector('#painel')
                const txt = JSON.stringify(result, null, 2)
                painel.innerHTML = txt.replace(/\n/g, '')
                    .replace(/\{/g, '{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
                    .replace(/\}/g, '}<br><br>')
                    .replace(/\[/g, '{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
                    .replace(/\]/g, '}<br><br>')
            })

        } catch (error) {
            console.log("(1)Erro: ", error)
        }

    }
}

const clear = () => {
    document.querySelector('#painel').innerHTML = ""
    inp.value = ""
    checkWidthInp()
}

document.querySelector("#clear").addEventListener('click', () => clear())

const getApi = async (url, callback) => {

    try {
        let response = null

        const regex = /\${encodeURIComponent\("(.*?)"\)}/
        const match = url.match(regex);

        if (match) {
            url = url.replace(match[0], encodeURIComponent(match[1].trim()))
        }

        if (addStatus) {
            const textAdd = textareaAddText.value.trim()
            response = await fetch(url, { textAdd })
            console.log(`${url}\n{${textAdd}}`)
        } else {
            response = await fetch(url)
            console.log(url)
        }

        if (!response.ok) {
            throw new Error('Erro na requisição da api: ' + response.statusText + ' - Código: ' + response.status)
        }

        const data = await response.json()
        console.log(data)
        callback(data)

    } catch (err) {
        alert("Erro na requisição da api")
        console.error(err)
    }
}

const addText = () => {
    const add = document.querySelector("#add")
    if (add.classList.contains('selecionado')) {
        add.classList.remove('selecionado')
        textareaAddText.style = "display: none;"
        addStatus = false
    } else {
        add.classList.add('selecionado')
        textareaAddText.style = "display: block;"
        addStatus = true
    }
}

document.querySelector('#input').addEventListener('input', () => checkWidthInp())
window.addEventListener('resize', () => checkWidthInp('input'))
document.querySelector('#get').addEventListener('click', () => clickBtn())
checkWidthInp()

