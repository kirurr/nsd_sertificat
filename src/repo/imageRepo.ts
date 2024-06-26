import sharp from 'sharp'
import path from 'node:path'

export const imageRepo = {
  async makeImage(name: string, sum: number, number:number) {
    const width = 1414
    const height = 2000

    const svgText = `
		<svg width="${width}" height="${height}">
			<style>
				.title { fill: #0e0e3e; font-size: 25px; font-family: "Roboto-Regular" };
			</style>
			<text x="50%" y="755" text-anchor="middle" class="title">${name}</text>
			<text x="50%" y="810" text-anchor="middle" class="title">№ ${number} на сумму ${sum} рублей</text>
		</svg>`

    const svgBuffer = Buffer.from(svgText)
		const fileName = `sertificat_${number}.png`
		
		const templatePath = path.join(process.cwd(), '/public/template.png')
		const resultPath = path.join(process.cwd(), '/public/results/result.png')

    await sharp(templatePath)
      .composite([{ input: svgBuffer }]).toFormat('png').toFile(resultPath)

		return fileName
  },

	makeData(){
		const date = new Date()
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		}

		let currentDate = date.toLocaleDateString("ru-RU", options)
		currentDate = this.formatDate(currentDate)

		let futureDate = new Date(2025, date.getMonth(), date.getDate()).toLocaleDateString("ru-RU", options)
		futureDate = this.formatDate(futureDate)
		
		return [currentDate, futureDate]
	},

	formatDate(date: string): string {
		let string = ''
		for(let i = 0; i < date.length; ++i) {
			if(date[i] === '/') string += '.'
			else string += date[i]
		} 
		return string
	}
}
