const button = document.querySelector('#btn')
const table = document.querySelector('#table')

button.addEventListener('click', () => {
	navigator.clipboard.writeText(table.innerText)
})
