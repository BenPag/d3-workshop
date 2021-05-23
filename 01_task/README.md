# Aufgabe 1 - Setup and update line chart (ca. 20 min)
Die erste Aufgabe enthält zu Beginn ein kleines warm-up, in der ein Liniendiagramm erstellt werden soll.
Dazu muss folgendes noch ergänzt werden:
* Skalen für die x-Achse und y-Achse
  * beide sollen lineare Skalen sein
* Zeichen der Line mit ``d3.line()``

Anschließend sollen die Funktionen ``addData``, ``removeData`` und ``updateChart`` vervollständigt bzw. implementiert werden.
* ``addData``: Füge den neuen generierten Wert zum Datensatz hinzu und aktualisiere den Graphen.
  * Zum Aktualisieren des Diagramms wird ``updateChart()`` aufgerufen.
* ``removeData``: Lösche den ersten oder letzten Eintrag im Datensatz, abhängig von der Selektion.
  * Zum Aktualisieren des Diagramms wird ``updateChart()`` aufgerufen.
* ``updateChart``: Implementiere hier die Update-Routine für das Liniendiagramm.
  Dazu müssen die Skalen, Achsen und die Linie aktualisiert werden.  

Die einzelnen Aufgaben sind ebenfalls im Quellcode als ``ToDo``-Kommentar hinterlegt.
Dies sieht bspw. folgendermaßen aus:  

    /*
      ToDo: implement foo and bar
    */

## Ziele
- [ ] Beim initialen Laden der Seite erscheint das vollständige Liniendiagramm 
- [ ] Beim Klicken auf den Button _Change dataset_ soll sich das komplette Diagramm ändern.
- [ ] Beim Klicken auf den Button _Add entry_ soll ein neuer Datensatz am Ende des Diagramms hinzugefügt werden.
- [ ] Beim Klicken auf den Button _Remove entry_ soll in Abhängigkeit der Auswahlbox, 
   das erste oder letzte Element im Datensatz gelöscht werden.

## Links
* [d3.scales](https://www.d3indepth.com/scales/)
* [d3.axes](https://www.tutorialsteacher.com/d3js/axes-in-d3)
* [d3.line()](https://www.d3-graph-gallery.com/graph/shape.html#myline)
* [Array.push()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/push)
* [Array.shift()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)
* [Array.pop()](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)
