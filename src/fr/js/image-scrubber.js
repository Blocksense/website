jQuery(document).ready(function($){
    //check if the .cd-image-container is in the viewport 
    //if yes, animate it
    checkPosition($('.cd-image-container'));
    $(window).on('scroll', function(){
        checkPosition($('.cd-image-container'));
        scrolls($('.cd-handle'), $('.cd-resize-img'), $('.cd-image-container'));

    });
    
    //make the .cd-handle element draggable and modify .cd-resize-img width according to its position
    drags($('.cd-handle'), $('.cd-resize-img'), $('.cd-image-container'), $('.cd-image-label[data-type="original"]'), $('.cd-image-label[data-type="modified"]'));

    //upadate images label visibility. Disbled for now!
    /*$(window).on('resize', function(){
        updateLabel($('.cd-image-label[data-type="modified"]'), $('.cd-resize-img'), 'left');
        updateLabel($('.cd-image-label[data-type="original"]'), $('.cd-resize-img'), 'right');
    }); */
});

function checkPosition(container) {
    if( $(window).scrollTop() + $(window).height()*0.5 > container.offset().top) {
        container.addClass('is-visible');

        


        //you can uncomment the following line if you don't have other events to bind to the window scroll
        // $(window).off('scroll');
    }
}



function scrolls(dragElement, resizeElement, container) {
    dragElement.addClass('movable');
    resizeElement.addClass('resizable');

    
    var percentageToAnimate = ($(window).scrollTop) - (container.offset().top) / 8 ;

        $('.movable').css('left', percentageToAnimate+"%" );   
        $('.resizable').css('width', percentageToAnimate+"%"); 
        

}

//draggable funtionality - credits to http://css-tricks.com/snippets/jquery/draggable-without-jquery-ui/
function drags(dragElement, resizeElement, container, labelContainer, labelResizeElement) {
    dragElement.on("mousedown vmousedown", function(e) {
        dragElement.addClass('draggable');
        resizeElement.addClass('resizable');

        var dragWidth = dragElement.outerWidth(),
            xPosition = dragElement.offset().left + dragWidth - e.pageX,
            containerOffset = container.offset().left,
            containerWidth = container.outerWidth(),
            minLeft = containerOffset - 10,
            maxLeft = containerOffset + containerWidth - dragWidth;
        
        dragElement.parents().on("mousemove vmousemove", function(e) {
            leftValue = e.pageX + xPosition - dragWidth;
            
            //constrain the draggable element to move inside his container
            if(leftValue < minLeft ) {
                leftValue = minLeft;
            } else if ( leftValue > maxLeft) {
                leftValue = maxLeft;
            }

            widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
            
            $('.draggable').css('left', widthValue).on("mouseup vmouseup", function() {
                $(this).removeClass('draggable');
                resizeElement.removeClass('resizable');
            });

            $('.resizable').css('width', widthValue); 

            updateLabel(labelResizeElement, resizeElement, 'left');
            updateLabel(labelContainer, resizeElement, 'right');
            
        }).on("mouseup vmouseup", function(e){
            dragElement.removeClass('draggable');
            resizeElement.removeClass('resizable');
        });
        e.preventDefault();
    }).on("mouseup vmouseup", function(e) {
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
    });
}

