var playing = false;
var score;
var trialsLeft;
var fruits = ['apple', 'banana', 'cherries', 'grapes', 'mango', 'orange', 'peach', 'pear', 'watermelon'];
var step;
var action;
$(function(){
    
    $('#start-reset').click(function(){
        if(playing == true)
            location.reload();
        else{
            //we are not playing
            playing = true;
            
            score = 0;
            $('#score-value').html(score);
            
            $('#game-over').hide();
            
            $('#trials-left').show();
            trialsLeft = 3;
            addHearts();
            
            startAction();
            //change button text to reset-game
            $('#start-reset').html('Reset Game');
        }
    });
    
});

function addHearts(){
    $('#trials-left').empty();
    for(i=0; i<trialsLeft; i++)
        $('#trials-left').append("<img src ='images/heart.png' class='life'>")
}

function startAction(){
    
    $('#fruit1').show();
    chooseFruits();
    $('#fruit1').css({
        'left' : Math.round(Math.random() * 550),
        'top' : -50,
    });
    
    //change the step randomly
    step = 1 + Math.round(Math.random() * 5);
    
    //move fruit down by 1 step by every 10 milliseconds
    action = setInterval(function(){
        
        //move the fruit by 1 step
        $('#fruit1').css('top', $('#fruit1').position().top + step);
        
        if($('#fruit1').position().top > $('#fruits-container').height())
        {
            if(trialsLeft > 1){
                $('#fruit1').show();
                chooseFruits();
                $('#fruit1').css({
                    'left' : Math.round(Math.random() * 550),
                    'top' : -50,
                });

                //change the step randomly
                step = 1 + Math.round(Math.random() * 5);
                trialsLeft--;
                addHearts();
            }
            else{
                playing = false;
                $('#start-reset').html("Start Game");
                $('#game-over').show();
                $('#game-over').html('<p> Game Over! </p> <p> Your Score is ' + score + '</p>');
                stopAction();
            }
        }
        
    }, 10);
    
}

$('#fruit1').mouseover(function(){
    
    score++;
    
    $('#score-value').html(score);
    
    clearInterval(action);
    
   $('#fruit1').hide("explode", 500);
 //    $('#fruit1').hide();
    
    setTimeout(startAction, 500);
    
    
});

function stopAction(){
    clearInterval(action);
    $('#fruit1').hide();
}

function chooseFruits(){
    $('#fruit1').attr("src", "images/"+fruits[Math.round(8 * Math.random())] + ".png");
}