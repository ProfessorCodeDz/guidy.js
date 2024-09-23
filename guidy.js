export default class Guidy{
    constructor({steps, loop, progress}){
        this.steps = steps
        this.loop = loop
        this.progress = progress
        this.currentStep = 0
    }
    play(){
        // first play
        this.playStep(this.currentStep)
    }
    playStep(stepNum){
        // close all previous guidy_el
        this.close()
        // et current step data
        const step = this.steps[stepNum]
        // get selected element
        const selected_el = document.querySelector(step.selector)
        // create guidy element            
        const guidy_el = document.createElement("div")
        // id
        guidy_el.id = "guidy_el"
        // guidy el html
        guidy_el.innerHTML = `
            <div class="guidy_el_container">
                <h2>${step.title}</h2>
                ${step.image ? `<img src="${step.image}"/>` : ""}                
                ${step.video ? `<video src="${step.video}" controls></video>` : ""}        
                <p>${step.description}</p>
                <div class="guidy_el_footer">
                    ${this.progress ? `<h3 class="guidy_el_progress">${this.currentStep+1}/${this.steps.length}</h3>` : ''}        
                    <div class="guidy_el_btns">
                        ${this.currentStep > 0 ? '<button id="prev_btn">Previous</button>' : ""}                   
                        <button id="next_btn">${this.currentStep == this.steps.length - 1 ? (this.loop ? "Restart" : "Finish") : "Next"}</button>
                    </div>
                </div>
                <div id="close">✖</div>
            </div>
        `
        // guidy el styling
        guidy_el.style.cssText = `
            position: absolute;
            padding: 5px;
            color: black;
            z-index: 9999;
        `
        guidy_el.querySelector(".guidy_el_container").style.cssText = `
            box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.2);
            padding: 15px;
            width: 300px;
            border-radius: 5px;
            background: white
        `
        if(guidy_el.querySelector(".guidy_el_container img")){
            guidy_el.querySelector(".guidy_el_container img").style.cssText = `
                width: 100%
            `
        }
        if(guidy_el.querySelector(".guidy_el_container video")){
            guidy_el.querySelector(".guidy_el_container video").style.cssText = `
                width: 100%
            `
        }
        guidy_el.querySelector(".guidy_el_footer").style.cssText = `
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 30px
        `
        guidy_el.querySelectorAll(".guidy_el_btns button").forEach(btn => {
            btn.style.cssText = `
                background: black;
                color: white;
                width: 80px;
                height: 30px;
                border: none;
                cursor: pointer;
                font-weight: bold    
            `
        })
        guidy_el.querySelector("#close").style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 20px;
            cursor: pointer
        `
        // add guidy el to body
        document.body.appendChild(guidy_el)
        // edit guidy el position
        switch(step.position){
            case "top":
                guidy_el.style.top = `${selected_el.offsetTop - guidy_el.offsetHeight}px`
                guidy_el.style.left = `${selected_el.offsetLeft + (selected_el.offsetWidth / 2) - (guidy_el.offsetWidth / 2)}px`                
                break;
            case "right":
                guidy_el.style.top = `${selected_el.offsetTop + (selected_el.offsetHeight/2-guidy_el.offsetHeight/2)}px`
                guidy_el.style.left = `${selected_el.offsetLeft + selected_el.offsetWidth}px`                
                break;
            case "bottom":
                guidy_el.style.top = `${selected_el.offsetTop + selected_el.offsetHeight}px`
                guidy_el.style.left = `${selected_el.offsetLeft + (selected_el.offsetWidth / 2) - (guidy_el.offsetWidth / 2)}px`
                break;
            case "left":
                guidy_el.style.top = `${selected_el.offsetTop + (selected_el.offsetHeight/2-guidy_el.offsetHeight/2)}px`
                guidy_el.style.left = `${selected_el.offsetLeft - guidy_el.offsetWidth}px`                
                break;
            default:
                break;    
        }
        // scroll to guidy el
        if(step.scroll){
            selected_el.scrollIntoView({behavior: 'smooth'})
        }
        // next button
        document.querySelector("#guidy_el #next_btn").onclick = () => {
            // delete all guidy elements
            this.close()
            // check final step 
            if(this.currentStep == this.steps.length - 1){
                // check loop steps
                if(this.loop){
                    this.currentStep = 0
                    this.playStep(this.currentStep)
                }
            }else{
                this.currentStep++
                this.playStep(this.currentStep)
            }
        }
        // previous button
        if(document.querySelector("#guidy_el #prev_btn")){
            document.querySelector("#guidy_el #prev_btn").onclick = () => {
                // check not first step 
                if(this.currentStep > 0){
                    // delete all guidy elements
                    this.close()
                    this.currentStep--
                    this.playStep(this.currentStep)
                }
            }
        }
        // close button
        document.querySelector("#guidy_el #close").onclick = () => {
            this.close()
        }
    }
    // close guidy_el
    close(){
        document.querySelectorAll("#guidy_el").forEach(el => el.remove())
    }
}
