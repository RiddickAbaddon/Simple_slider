# Simple_slider
Plug for easy and quick insertion of sliders

Required jquery 1.6+
Required jqueryui 1.8+

Data types:
slide-background: url to background-image. Can use on slider and slider container.
slide-color: background-color of slide. Can use on slider and slider container.
slide-effect: Can use on slide and slider container.
slide-effect-show: Can use on slide and slider container. Replace slide-effect on show.
slide-effect-hide: Can use on slide and slider container. Replace slide-effect on hide.
slide-speed: Can use on slide and slider container.

use on container to set data to all slides
use on slide to set data on one slide

onclick function: 
your_slider_object.change_slide('prev') : use on left arrow
your_slider_object.change_slide('next') : use on right arrow
your_slider_object.change_slide(1) : use on thumb

Slider thumbs:
To duplicate slider thumbs and automatically set values, write first thumb and set in object configuration required classes
write '1' to set numbering 1,2,3....
write 'a' to set numbering a,b,c....
set in thumb css text-transform: uppercase to set numbering A,B,C....

Effects: blind | bounce | clip | drop | fade | fold | puff | pulsate | scale | shake | size | slide
