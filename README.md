iolab-lecture15
==============

In this lab, you will build on the simple visualization from last class. Your tasks are as follow: 
* In the previous version, all the dimensions & positions are hard coded, i.e. if you change the svg size, the chart won't get bigger or smaller. Make it so that the chart responds dynamically to changes in svg size. For this lab, only worry about changes in y-coordinate (i.e. if the svg gets taller, the bar heights get taller as well). 
* Add a y-axis that has 5 ticks which represent the range of grades possible: 0, 20,40, 60, 80, 100. The grid should also change dynamically if the svg size changes.
* Create a pie chart that shows the ratio of students who passed and those who failed the exam. Use the previously set "datasetPerformance".

If you need more guidance, link the index file to "_js/script-beginner.js". Otherwise, link it to "_js/script-advanced.js"

Here are some links you may find useful:
* D3 scales - http://alignedleft.com/tutorials/d3/scales
* D3 axis - http://alignedleft.com/tutorials/d3/axes
* D3 pie charts - https://gist.github.com/enjalot/1203641
