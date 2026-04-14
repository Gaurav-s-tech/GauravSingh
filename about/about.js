document.addEventListener('DOMContentLoaded', () => {
    const textToType = "> Hello. I am an IT Professional and Systems Administrator based in Edmonton, Canada. \n> I specialize in system administration, security, ITIL processes, and hardware/software configuration.\n> Currently, I provide technical support while continually expanding my toolkit—from managing Entra ID and Active Directory environments to studying full-stack web development.";
    
    const typeTarget = document.getElementById('typewriter-text');
    let i = 0;
    
    // Create cursor element
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    
    function typeWriter() {
        if (i < textToType.length) {
            // Handle line breaks properly
            if (textToType.charAt(i) === '\n') {
                typeTarget.insertBefore(document.createElement('br'), cursor);
            } else {
                const charNode = document.createTextNode(textToType.charAt(i));
                typeTarget.insertBefore(charNode, cursor);
            }
            i++;
            // Randomize typing speed slightly for realism
            setTimeout(typeWriter, Math.random() * 30 + 20);
        }
    }

    // Append cursor and start typing
    if (typeTarget) {
        typeTarget.appendChild(cursor);
        setTimeout(typeWriter, 500); // Wait half a second before typing
    }
});