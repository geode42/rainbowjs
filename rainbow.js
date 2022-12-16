function HSVtoRGB(h, s, v) {
    let i = Math.floor(h * 6)
    let f = h * 6 - i
    let p = v * (1 - s)
    let q = v * (1 - f * s)
    let t = v * (1 - (1 - f) * s)
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break
        case 1: r = q, g = v, b = p; break
        case 2: r = p, g = v, b = t; break
        case 3: r = p, g = q, b = v; break
        case 4: r = t, g = p, b = v; break
        case 5: r = v, g = p, b = q; break
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    }
}

function makeElementRainbow(element, cycleDuration, updateInterval, blurRadius) {
	// setInterval returns its id (a number), which can be passed to clearInterval to remove the interval
	let rainbowIntervalID = setInterval(() => {
		// Get seconds in Unix time
		let epochTime = new Date().getTime() / 1000 // Divide by 1000 to get seconds
		// Get RGB color
		let color = HSVtoRGB(epochTime / cycleDuration, 1, 1) // The HSVtoRGB function already modulos the hue, so dividing is enough
		// Apply the color
		element.style.color = `rgb(${color.r} ${color.g} ${color.b})`
		element.style.textShadow = `0 0 ${blurRadius}px rgb(${color.r} ${color.g} ${color.b})`
	}, updateInterval)
	// Store the interval ID so that the makeElementNotRainbow function can clear it
	element.dataset.rainbowIntervalId = rainbowIntervalID
}

function makeElementNotRainbow(element) {
	// Only rainbow elements have an interval ID. If this element doesn't, it's probably not a rainbow element, so return
	if (element.dataset.rainbowIntervalId == undefined) return
	// Get the interval ID to remove the interval
	let rainbowIntervalID = element.dataset.rainbowIntervalId
	// Remove the interval using the ID
	clearInterval(rainbowIntervalID)
	// Clean up
	delete element.dataset.rainbow
	delete element.dataset.rainbowIntervalId
	// TODO: Figure out a good way to remove color from the style attribute (the user might have used .style as well, can't interfere with that) 
}
