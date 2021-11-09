import { Flex, Heading, HStack, VStack,Text } from "@chakra-ui/layout"

export const Contact=()=>{
    return(
        <>
        
        <Flex justifyContent="center" alignItems="center" flexDirection="column" boxShadow="dark-lg" width="80%" m={5} mx="auto" p={5} >
        <Heading as="ins" p={3}>Contact Us</Heading>
        <Text fontSize="2xl">You can contact us through our facebook page or whatsapp</Text>


        <HStack>
                     
                     <>
                     <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FSL-Travellers-107617261719910%2F&tabs=messages%2C%20timeline%20&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false&appId" width="340" height="500" style={{border:"none",overflow:"hidden"}} scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>                    </>
                     
        </HStack>




        </Flex>

               
        {whatsapp()}


        </>
    )
}

function whatsapp () {
    var options = {
        whatsapp: "0713412986", // WhatsApp number
        call_to_action: "Message us", // Call to action
        position: "right", // Position may be 'right' or 'left'
    };
    var proto = document.location.protocol, host = "getbutton.io", url = proto + "//static." + host;
    var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true; s.src = url + '/widget-send-button/js/init.js';
    // s.onload = function () { WhWidgetSendButton.init(host, proto, options); };
    // var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
}