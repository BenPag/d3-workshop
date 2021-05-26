# Aufgabe 3 - Data-Binding und Data-Joining (ca. 20 min)
Die dritte Aufgabe ist zweigeteilt, in der zunächst das Data-Binding implementiert werden soll.
Anschließend soll das Data-Joining neuer Daten durch die Funktion ``.join()`` realisiert werden.

Folgendes Verhalten soll beim Datenupdate implementiert werden:
* `enter`: Kreise erhalten grün als Farbe
* `exit`: Kreise werden per Transition ausgeblendet und zum Abschluss der Transition entfernt

Die einzelnen Aufgaben sind ebenfalls im Quellcode als ``ToDo``-Kommentar hinterlegt.
Dies sieht bspw. folgendermaßen aus:

    /*
      ToDo: implement foo and bar
    */

## Ziele
- [ ] Nutzung von Data-Bindings beim Erstellen und Update des Diagramms
- [ ] Nutzung von ``.join()``, um Elemente hinzufügen, entfernen oder ändern zu können

### Bonusaufgabe
Erweitere das Verhalten der Datenupdates:

`enter`
* Neue Kreise haben initial einen fünffachen Radius, der per Transition auf dem einfachen Radius geändert wird.
  * Änderung des Radius von bspw. 10 auf 2
* Neue Kreise sollen in der Mitte des Diagramms gezeichnet werden zu den entsprechenden Koordinaten _wandern_.
* Neue Kreise ändern per Transition ihre Farbe auf Pink zurück
  * Von grün nach pink.

`exit`
* Kreise, die entfernt werden sollen, sollen vor Beginn der Transition rot gefärbt werden und den doppelten Radius erhalten.
* Der Radius der Kreise durch eine Transition auf den Wert 1 reduziert werden. 

## Links
* [d3.max()](https://observablehq.com/@d3/d3-extent)
* [SVG \<circle>](https://www.w3schools.com/graphics/svg_circle.asp)
* [D3.join()](https://www.createwithdata.com/enter-exit-with-d3-join/)
