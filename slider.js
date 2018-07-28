class slider_init {
    constructor(config = {}) {
        // Default configuration
        this.config = {
            width: "100%",
            height: "500px",
            container: null,
            slideClass: null,
            showTime: 500,
            first: 1,
            thumbContainer: null,
            thumbClass: null,
            changeSpeed: 500,
            defaultEffect: "fade",
            autoload: false,
            autoloadTime: 5000,
            stopOnInteraction: false
        }
        $.each(this.config, element => {
            if(config[element]!=undefined) this.config[element] = config[element];
        });
        this.currentSlide = this.config.first;
        this.sliderCount = $(this.config.slideClass).length;
        
        this.init();
    }
    init() {
        //set base display
        $(this.config.container).css("position","relative");
        $(this.config.slideClass).css("position","absolute");
        $(this.config.slideClass).css("display","none");
        $(this.config.slideClass+":nth-child("+this.currentSlide+")").css("display","block");
        $(this.config.slideClass).css("z-index","1");
        $(this.config.slideClass+":nth-child("+this.currentSlide+")").css("z-index","2");
        $(this.config.container+", "+this.config.slideClass).css("overflow","hidden");
        $(this.config.container+", "+this.config.slideClass).css("width",this.config.width);
        $(this.config.container+", "+this.config.slideClass).css("height",this.config.height);

        //set background
        $(this.config.container+", "+this.config.slideClass).css("background-size","cover");
        $(this.config.container+", "+this.config.slideClass).css("background-position","center");
        this.set_data_attributes("slide-background", [this.config.slideClass, this.config.container], (attr, element) => {
            element.css("background-image", "url("+attr+")");
        });
        this.set_data_attributes("slide-color", [this.config.slideClass, this.config.container], (attr, element) => {
            element.css("background-color", attr);
        });


        //duplicate thumbs
        if(this.config.thumbContainer!=null && this.config.thumbClass!=null) {
            for(let i=1; i<this.sliderCount; i++) {
                let text = $(this.config.thumbClass+":first-child").text();
                let onclick = $(this.config.thumbClass+":first-child").attr("onclick");
                onclick = onclick.slice(0, onclick.search("change_slide")+12);
                onclick += "("+(i+1)+")";
                
                if($(this.config.thumbClass+":first-child").text() == "1") {
                    text = i + 1;
                }
                if($(this.config.thumbClass+":first-child").text() == "a") {
                    text = String.fromCharCode(i + 97);
                }
                let element = "<div class="+this.config.thumbClass.slice(1)+" onclick='"+onclick+"'>"+text+"</div>";
                $(this.config.thumbContainer).append(element);
            }
        }
        
        $(this.config.thumbClass+":nth-child("+this.currentSlide+")").addClass("active");

        //show
        $(this.config.container).fadeIn(this.config.showTime);

        if(this.config.stopOnInteraction) {
            $(this.config.container).click(() => {
                this.config.autoload = false;
            });
        }
        this.auto_slide();
    }
    set_data_attributes(attr, elements, fn = (attr, element) => {}) {
        let len = 1;
        if(Array.isArray(elements)) len = elements.length;

        for(let i=0; i<len; i++) {
            let element = (Array.isArray(elements)) ? elements[i] : elements;
            let elementCount = $(element).length;

            for(let j=1; j<=elementCount; j++) {
                let at = $(element+":nth-child("+j+")").attr(attr);
                if (typeof at !== typeof undefined && at !== false) {
                    let el = $(element+":nth-child("+j+")")
                    fn(at, el);
                }
            }
        }
    }
    change_slide(slide) {
        if(slide!=this.currentSlide) {
            let nb = slide;
            if(slide == "next") {
                nb = ((this.currentSlide+1)<=this.sliderCount) ? this.currentSlide+1 : 1;
            }
            if(slide == "prev") {
                nb = ((this.currentSlide-1)>=1) ? this.currentSlide-1 : this.sliderCount;
            }
            this.slide_hide(this.currentSlide);
            this.slide_show(nb);
            $(this.config.thumbClass).removeClass("active");
            $(this.config.thumbClass+":nth-child("+nb+")").addClass("active");
            this.currentSlide = nb;
        }
    }
    slide_hide(slide) {
        let element = $(this.config.slideClass+":nth-child("+slide+")");
        let speed1 = element.attr("slide-speed");
        let speed_global = $(this.config.container).attr("slide-speed");
        let effect1 = element.attr("slide-effect");
        let effect2 = element.attr("slide-effect-hide");
        let effect_global1 = $(this.config.container).attr("slide-effect");
        let effect_global2 = $(this.config.container).attr("slide-effect-hide");

        let speed = this.config.changeSpeed;
        let effect = this.config.defaultEffect;

        if (typeof speed_global !== typeof undefined && speed_global !== false) {
            speed = speed_global;
        }
        if (typeof speed1 !== typeof undefined && speed1 !== false) {
            speed = speed1;
        }
        speed = Number(speed);
        if (typeof effect_global1 !== typeof undefined && effect_global1 !== false) {
            effect = effect_global1;
        }
        if (typeof effect_global2 !== typeof undefined && effect_global2 !== false) {
            effect = effect_global2;
        }
        if (typeof effect1 !== typeof undefined && effect1 !== false) {
            effect = effect1;
        }
        if (typeof effect2 !== typeof undefined && effect2 !== false) {
            effect = effect2;
        }

        element.css("z-index", "1");
        element.hide(effect,speed);
        return speed;
    }
    slide_show(slide) {
        let element = $(this.config.slideClass+":nth-child("+slide+")");
        let speed1 = element.attr("slide-speed");
        let speed_global = $(this.config.container).attr("slide-speed");
        let effect1 = element.attr("slide-effect");
        let effect2 = element.attr("slide-effect-show");
        let effect_global1 = $(this.config.container).attr("slide-effect");
        let effect_global2 = $(this.config.container).attr("slide-effect-show");

        let speed = this.config.changeSpeed;
        let effect = this.config.defaultEffect;

        if (typeof speed_global !== typeof undefined && speed_global !== false) {
            speed = speed_global;
        }
        if (typeof speed1 !== typeof undefined && speed1 !== false) {
            speed = speed1;
        }
        speed = Number(speed);
        if (typeof effect_global1 !== typeof undefined && effect_global1 !== false) {
            effect = effect_global1;
        }
        if (typeof effect_global2 !== typeof undefined && effect_global2 !== false) {
            effect = effect_global2;
        }
        if (typeof effect1 !== typeof undefined && effect1 !== false) {
            effect = effect1;
        }
        if (typeof effect2 !== typeof undefined && effect2 !== false) {
            effect = effect2;
        }

        element.css("z-index", "2");
        element.show(effect,speed);
        return speed;
    }
    auto_slide() {
        if(this.config.autoload == true) {
            setTimeout(() => {
                if(this.config.autoload == true) {
                    this.change_slide('next');
                    this.auto_slide();
                }
            },this.config.autoloadTime);
        }
    }
}