$(document).ready(function() {

	$(document).on("submit", ".ajaxformclass", function (event) {
		//alert('ok');
		//return false;
	var posturl=$(this).attr('action');
	var callbackFunction=$(this).attr('data-callback_function');
	if(callbackFunction)
	{
		if(callbackForm(callbackFunction) == false)
		{
			return false;
		}
	}
	var btn_txt;
	var formid = $(this).attr('id');
	if(formid)
	var formid = '#'+formid;
	else
	var formid = ".ajaxformclass";


$(".submit").attr("disabled", true);

	$(this).ajaxSubmit({
			url: posturl,
			dataType: 'json',
			beforeSend: function(){

				$('.formmessage').remove();
			$(formid).find('.box-error').attr("placeholder", "")
			$(formid).find('.box-error').removeClass('box-error');
			$(formid).find('.alert').removeClass('alert-info').removeClass('alert-success').removeClass('alert-danger').fadeIn(200);
			$(formid).find('.alert').addClass('alert-info');
			$(formid).find('.alert').show();
			$(formid).find('.ajax_message').html('<strong>Please Wait ! <i class="fa fa-spinner fa-spin" aria-hidden="true"></i></strong>');
			},
			success: function(response){
				// alert('response');
				
				//alert('success');
				if(response.notLoggedIn)
				{
					window.location.href = response.route;
				}
				$(".submit").removeAttr("disabled", 'disabled');

				$(formid).find('.alert').removeClass('alert-info').removeClass('alert-success').removeClass('alert-danger').fadeOut(200);
				$(formid).find('.form-group').removeClass('has-error');
				$(formid).find('.display-error').removeClass('box-error');

				$(formid).find('.alert').removeClass('alert-info').removeClass('alert-success').removeClass('alert-danger').fadeOut(200);

               
                if (response.status == "success") {
					if(response.msgHead)
					toastr[response.msgType](response.msg, response.msgHead);
					
					if(response.success_msg)
					toastr['success'](response.msg, 'Success');
					
					
					
                    $(formid).find('.alert').fadeIn();
                    $(formid).find('.alert').addClass('alert-success').children('.ajax_message').html(response.success_msg);
					
					$(formid).find('.alert').fadeOut();
					
                } 
                else {
					
                    $(formid).find('.alert').fadeIn();
                    $(formid).find('.alert').addClass('alert-danger').children('.ajax_message').html(response.error_msg);
                    
                   
                   
                    $.each(response.errorArray, function(key, value) {
						
						if (!/\brequired\b/.test(value)){
					  		$(formid).find('.ajax_message').append('<br>'+value);
						} 
                        console.log(key + " => " + value);
						var placeH	=value;						
						$(formid).find('input[name="' + key + '"], select[name="' + key + '"],textarea[name="' + key + '"]').attr("placeholder", placeH);
						$(formid).find('input[name="' + key + '"], select[name="' + key + '"],textarea[name="' + key + '"]').addClass('box-error');
						
						if ( $(this).is('select') )
						$(formid).find('.selectOption').addClass('state-error');
						
                    });
                }
			if(response.resetform)
			{
				$(formid).resetForm();
			}
			
			   
			if(response.loginstatus=='success'){
                window.location.href = response.url;
			}    
            if(response.openPassword){
				$('.show_password').removeClass('d-none');
				$('.check_number').attr('name','email');
				$('form').attr('action',"http://ibstrio.codespur.us/store");

			}
            if (response.slideToTop) {
                $('html, body').animate({
					
                    scrollTop: $(formid).offset().top - 290
                }, 800);
            }
            if (response.url)
            {
				
                window.location.href = response.url;
			}
            if (response.selfReload)
            {
                window.location.reload();
			}
			if (response.closeModal)
			{
				$(response.closeModal).modal('toggle');
			}
            if (response.status == 'success') {
                //$(formid)[0].reset();
            }
            if (response.redirect == 'yes') {
                window.location.href = response.redirectUrl;
            }
           if (response.video == "yes")
            {
				alert("done");
               $("#thisdiv2").load(" #thisdiv2 > *");
                //window.location.reload();
			}
            
            if(response.ajaxPageCallBack)
			{
				
				response.formid = formid;				
				ajaxPageCallBack(response);

			}
			},
			error: function(response) {
				
				$(".submit").removeAttr("disabled", 'disabled');
		//	alert('server error');          
               
			}
		});
	return false;
	});

	$(document).on("click", ".alert .close", function (event) {
		$(this).closest(".ajax_report").hide();
		$(this).closest(".alert").hide();
	});
});

function slideToElement(element,position)
{
	var target = $(element);

	$('html, body').animate({
		scrollTop: target.offset().top-100
	}, 500);
}

function slideToDiv(element)
{
	$("html, body").animate({scrollTop: $(element).offset().top-50 }, 1000);
}
function slideToTop()
{
	$("html, body").animate({scrollTop: 50}, 1000);
}
function openPassword()
{
	$('.show_password').removeClass('d-none');
	$('form').attr('action',"route('route('user.auth.login')");
}
function isset(variable)
{
	if(typeof(variable) != "undefined" && variable !== null)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function hide_alert_message(){
	setTimeout(function() {
		$('.alert.alert-dismissable').fadeOut(1000);
	}, 3000);
}
function ajaxPageCallBack(response)
{
    var CallBackRequest	=	response.CallBackRequest;

    if(CallBackRequest == 'facility')
    {
        if(response.success){
            var data = response.data;
            var html ='<dt>Total Balance</dt><dd>$'+data.amount+'</dd><dt>Remain Balance</dt><dd>$'+data.remain_amount+'</dd><dt>Giftcard Expiry</dt><dd>'+data.expiry_date+'</dd>';

            $('.show-result').find('dl').html(html);
        }
        else{
            $('.show-result').find('dl').html('');
        }
    }
}
