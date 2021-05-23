# Aufgabe 2 - Transitions (ca. 15 min)
Die zweite Aufgabe beschäftigt sich damit, Änderungen im Liniendiagramm zu animieren.
Dazu werden in d3.js Transitions (Übergange) verwendet. 
Alle vorzunehmenden Änderungen sollen in der Funktion ``updateChart()`` vorgenommen werden.

Für folgende Elemente sollen Transitions implementiert werden:
* x-Achse
* y-Achse
* gezeichnete Linie (zwei aufeinanderfolgenden Transitions)

Grundsätzlich gibt es keine Vorgaben, welche Transition oder Dauer genutzt werden soll.
Hier kann also frei experimentiert und ausprobiert werden. 
Achtet daher beim Bearbeiten auf die zur Verfügung stehenden Zeit.
Ebenso empfiehlt es sich, für beide Achsen die gleiche Transition und Dauer zu verwenden.

Die einzelnen Aufgaben sind ebenfalls im Quellcode als ``ToDo``-Kommentar hinterlegt.
Dies sieht bspw. folgendermaßen aus:

    /*
      ToDo: implement foo and bar
    */

## Ziele
In dieser Aufgabe kann man viel Ausprobieren und Testen, achtet daher beim Bearbeiten auf die Zeit.
- [ ] Es gibt eine Transition für die x-Achse und y-Achse
- [ ] Die gezeichnete Linie besitzt zwei aufeinanderfolgenden Transitions

## Ideen / Beispiel für Transitions
**x-Achse und y-Achse**

* Nutzung einer linearen Transition 
* Dauer der Transition: 800 Millisekunden.

**gezeichnete Linie**

* Beide Transitions sind linear.
* Die 1. Transition soll die Änderung der Linie animieren.
    * Zu Beginn der Transition soll die Linie grün gefärbt werden.
    * Die Transition dauert 800 Millisekunden.
* Die 2. Transition soll die Linie wieder pink färben.
    * Die Transition dauert 400 Millisekunden.

## Links
* [d3-transition API Reference](https://github.com/d3/d3-transition#api-reference)
* [d3-ease API Reference](https://github.com/d3/d3-ease#api-reference)
