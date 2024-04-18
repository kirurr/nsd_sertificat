document.querySelector('#btn').addEventListener('click', () => {
	navigator.clipboard.writeText(document.querySelector('table').innerText)
})
