# Handout und CheatSheet
## Inhaltsverzeichnis
* [.transition()](#transition)
  * [.delay()](#delay)
  * [.ease()](#ease)
* [Key-Binding with .data()](#key-binding-with-data)
* [selection.join()](#selectionjoin)
  * [selection.call()](#selectioncall)
* [Weitere Links](#weitere-links)

Die hier aufbereiteten Informationen basieren auf dem Kapitel „Updates, Transition and Motion“ aus Scott Murrys Buch „Interactive Data Visualization for the Web: An Introduction to Designing with D3“ von 2017 und drüber hinaus.

Bewegung in Visualisierungen kann dabei verschiedenen Zielen dienen:
* Dynamische Präsentation für ein besseres Verständnis
  * Daten werden vom Betrachter einfacher im Zusammenhang verstanden
  * Veränderungen von Daten sind eindeutiger zu erkennen
* Verbesserung der Usability durch Updates
  * Gezielte Updates sind besser als der Umgang mit separierten Visualisierungen
  * Visualisierungen können vom Nutzer anpassbar gemacht werde
* Agieren mit Real-Time Daten und Datenverläufen
  * Neue Daten können sofort einer Visualisierung hinzugefügt werden
  * Bewegung kann wie eine weitere Dimension in der Visualisierung Informationen über eine Zeitachse verdeutlichen


Werden neue Werte einem Datensatz zuweisen können diese einfach über date() aktualisiert werden.
```
const dataset = [ 1, 2, 4, 10, 100];
svg.selectAll("rect")
    .data(dataset);
```
Beim Aktualisieren des Datensatzes müssen die zugehörigen Elemente ebenfalls aktualisiert werden. Hier aktualisieren der Höhen und y-Positionen eines Balkendiagrames:svg.selectAll("rect")
```
.data(dataset)
.attr("y", function(d) {
	return h - yScale(d);
})
.attr("height", function(d) {
	return yScale(d);
});
```

## .transition()
Übergänge lassen sich Animieren. Dabei wird zwischen dem Ursprungszustand und dem neuen Zustand interpoliert.
```
.transition() // Die Standart-Zeit einer Transition ist 250 Millisekunden.
.duration(1000) // mittels der Duration kann die Zeit in Millisekunden angepasst werden. Hier auf 1 Sekunde.
```
### .delay()
Verzögerungen können über `delay()` realisiert werden.

Zum Beispiel: `.delay(1000)`

<strong style="color:#900">Vorsicht</strong>

`delay()` sollte nur mit Bedacht und gutem Grund genutzt werden.
Nutzer sollten nicht warten müssen.

### .ease()
Stil der Übergangsanimation lassen sich mit `ease()` anpassen.

Zum Beispiel: `.ease(d3.easeLinear) `

<strong style="color:#900">Vorsicht</strong>

ease() muss nach transition() aber vor attr() angewendet werden. 

In d3 kann aus einer Vielzahl von Animationen gewählt werden. Hier einige Beispiele:
* d3.easeLinear – Konstante Geschwindigkeit der Animation.
* d3.easeCircleIn – allmähliches Nachlassen und Beschleunigen, bis die Elemente einrasten.
* d3.easeElasticOut – Sprungfeder-Artige Bewegung.
* d3.easeBounceOut – zunehmende Bewegung die am Ende vor und zurückspringt wie ein Ball.
Auf zu verspielte Animationen sollte verzichtet werden. Solche lenken die Aufmerksamkeit weg von den Informationen, die im Zentrum stehen sollten.

on() ist eine Methode zum Ausführen einer Funktion vor Beginn oder am Ende der Aktualisierung
```
// Funktion die vor dem Übergang durchgeführt wird 
.on("start", function() { 
	d3.select(this) // Selects 'this', the current element
		.attr("fill", "magenta") // Sets fill of 'this' to magenta
})

// Funktion die nach dem Übergang ausgeführt wird
.on("end", function() { 
	d3.select(this)
		.transition() // Übergang am Ende der Animation sind gefahrlos möglich
		.duration(250) 
		.attr("fill", "black")
})
```
<strong style="color:#900">Vorsicht</strong>

transition in `on("start")`, kann dazu führen das andere Updates mit Übergängen, wie Positionsänderungen, nicht mehr durchgeführt werden. Standardmäßig können mehrere transitions nicht durchgeführt werden. Neuere transitions stoppen und überschreiben ältere.
Für `on("end", …)` gilt dies nicht. Die Hauptübergänge sind am Ende bereits abgeschlossen und somit kann hier gefahrlos transitions verwendet werden.

Beispiel: OnClick-Event, bei dem ein Datensatz mit neuen Daten aktualisiert wird:
```
d3.select("p").on("click", function() {
	//Einträge des Datensatzes der beim onClick eingefügt wird
	dataset = [ 11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
	5, 10, 13, 19, 21, 25, 22, 18, 15, 13 ];

	//Update all rects
	svg.selectAll("rect")
		.data(dataset)
		.delay(1000) //Verzögerung von 1 Sekunde
		.transition() //Flüssiger Übergang
		.duration(2000) //2,000 ms or 2 seconds
		.ease(d3.easeLinear) // Still des Übergangs
		.on("start", function() { // Funktion die vor dem Übergang durchgeführt wird
			d3.select(this).attr("fill", "red"); // Balken werden vor dem Übergang rot eingefärbt 
			// transition an dieser Stelle überschreibt vorhergehende transitions. Nicht verwenden!
		})
		.attr("y", function(d) {
			return h - yScale(d);
		})
		.attr("height", function(d) {
			return yScale(d);	
		})
		.attr("fill", function(d) {
			return "rgb(0, 0, " + Math.round(d * 10) + ")";
		});
		.on("end", function() {// Funktion die nach dem Übergang ausgeführt wird
			d3.select(this)
				.transition() // Übergang am Ende der Animation sind gefahrlos möglich
				.duration(250) 
				.attr("fill", "black") // Balken werden wieder schwarz eingefärbt
				.attr("r", 3);
		});
});
```
<strong style="color:#900">Vorsicht</strong>

Hier kann keine Arrow-Function als Callback genutzt werden, da `this` sonst nicht verfügbar ist.

## Key-Binding with .data()
Key Binding sind eine Möglichkeit Daten mit einem künstlichen Schlüssel als unique identifier zu verknüpfen. So ist der Datensatz unabhängig vom Index des Arrays.
`.data(<array>, <key-function>)`
```
const dataset = [ 
	{ key: 0, value: 5 },
	{ key: 1, value: 10 },
	{ key: 2, value: 13 },
	{ key: 3, value: 19 },
	{ key: 4, value: 21 },
	{ key: 5, value: 25 } 
];
svg.selectAll("rect")
	.data(dataset, (d) => d.key);
```
Ein Vorteil dieses Vorgehens ist, das Operationen wie Sortierungen oder ergänzen und hinzufügen von Einträgen einfacher realisiert werden kann. Der Ursprungsdatensatz muss nicht mehr, im gesamten, manipuliert werden.

## selection.join()
```
.join(
	(enter) => enter.append(circle),
	(update) => update,
	(exit) => exit
);
```
Der selection.join() besitzt drei Parameter:
* enter() – hinzufügen neuer Daten
* update() – aktualisieren der Elemente mit den daten
* exit() – entfernen von Elementen ohne Daten

<strong style="color:#900">Vorsicht</strong>

selection.join() wurde erst mit der Version 1.4 eingeführt. 

### selection.call()

Ähnlich wie bei on() kann auch innerhalb eines join(), mittels call(), in entsprechenden Funktionen weitere Operation eingebunden werden. So können Transitions an beispielsweise exit() gebunden werden, die dann während des Entfernens von Elementen ausgewirkt werden.
```
.join(
(enter) => enter,
(update) => update,
(exit) => exit.call(exit => 
		exit.transition()
		.attr(r, 0)
		.on(end, function () {
			d3.select(this).remove();
		})
	)
)
```
## Weitere Links
* [Building shapes with d3](https://www.d3-graph-gallery.com/graph/shape.html)
* [Create Axes in D3.js](https://www.tutorialsteacher.com/d3js/axes-in-d3)
* [Scale functions | D3 in Depth](https://www.d3indepth.com/scales/)
* [d3/d3-ease: Easing functions for smooth animation](https://github.com/d3/d3-ease)
* [d3/d3-transition: Animated transitions for D3 selections](https://github.com/d3/d3-transition)
* [Handling entering and exiting elements with D3's .join() function](https://www.createwithdata.com/enter-exit-with-d3-join/)
* [SVG Circle](https://www.w3schools.com/graphics/svg_circle.asp)
* [d3.min, d3.max, d3.extent / D3 / Observable](https://observablehq.com/@d3/d3-extent)
