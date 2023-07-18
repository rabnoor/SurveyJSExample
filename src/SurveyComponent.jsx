import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./index.css";


let Ranks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']


function logic(n) {
    return parseInt(n)+300
  }
  
function letterAhead(letter) {

let ind = Ranks.indexOf(letter)

if (ind+2 < Ranks.length){
return Ranks[ind+2]
}
return Ranks[Ranks.length-1]
}

function letterBehind(letter) {


let ind = Ranks.indexOf(letter)

if (ind-2 >= 0){
    return Ranks[ind-2]
}
return Ranks[0]

}



function SurveyComponent() {
    const surveyJson = {
        elements: [{
          name: "ChessRank",
          title: "Chess Rank Thingy:",
          type: "text"
        }, 
        
        {
          name: "isStrong",
          title: "You think you can beat {competeRank}" ,
          type: "boolean",
          valueTrue: "Yes",
          valueFalse: "No",
          "renderAs": "radio"
      ,
          visibleIf: "{ChessRank} notempty",
          visible: false 
      
        },
        {
          name: "LetterRank",
          title: "Choose your letter" ,
          type: "dropdown",
          isRequired: true,
          showNoneItem: true,
          showOtherItem: true,
          choices: Ranks,
          visibleIf: "{ChessRank} notempty",
      
        },
        {
          name: "LetterStrong",
          title: "" ,
          type: "text",
          visibleIf: "{LetterRank} notempty",
          visible: false ,
          type: "boolean",
          valueTrue: "Yes",
          valueFalse: "No",
          "renderAs": "radio"
      
      
        },

        {
            name: "LetterWeak",
            title: "" ,
            type: "text",
            visibleIf: "{LetterRank} notempty",
            visible: false ,
            type: "boolean",
            valueTrue: "Yes",
            valueFalse: "No",
            "renderAs": "radio"
        
        
          }
      
      
      
      ]
      };
    const survey = new Model(surveyJson);
    console.log(survey)
    survey.onValueChanged.add(function (sender, options) {
        if (options.name === "ChessRank") {
          var prevAnswer = options.value; // Get the current answer for Q1
          var nextValue = logic(prevAnswer); // Apply the logic using the custom function
      
          // Get the reference to the next question (Q2) and update its choices or value dynamically
          var q2Question = sender.getQuestionByName("isStrong");
          q2Question.title = "You think you can beat : " + nextValue; // For dropdown or checkbox question, use 'choices'
          // q2Question.value = nextValue; // For text question, use 'value'
      
          // Make the next question (Q2) visible after applying the logic
          q2Question.visible = true;
      
          // Trigger re-rendering of the survey to show the updated next question (Q2)
          sender.render();
        }
    
        if (options.name === "LetterRank") {
          var prevAnswer = options.value; // Get the current answer for Q1
          var nextValue = letterAhead(prevAnswer); // Apply the logic using the custom function
          var prevValue = letterBehind(prevAnswer)  
          // Get the reference to the next question (Q2) and update its choices or value dynamically
          var q2Question = sender.getQuestionByName("LetterStrong");
          q2Question.title = "You think you can beat : " + nextValue; // For dropdown or checkbox question, use 'choices'
          // q2Question.value = nextValue; // For text question, use 'value'
      
          // Make the next question (Q2) visible after applying the logic
          q2Question.visible = true;

          var q3Question = sender.getQuestionByName("LetterWeak");
          q3Question.title = "You think you can beat : " + prevValue; // For dropdown or checkbox question, use 'choices'
          // q2Question.value = nextValue; // For text question, use 'value'
      
          // Make the next question (Q2) visible after applying the logic
          q2Question.visible = true;
      
          // Trigger re-rendering of the survey to show the updated next question (Q2)
          sender.render();
        }
      });

    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
    });
    return (<Survey model={survey} />);
}

export default SurveyComponent;