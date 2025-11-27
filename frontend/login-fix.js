// FIX: Add missing showLoginModal function
function showLoginModal() {
    console.log("Login modal triggered");
    alert("Admin login will be available soon");
}

// Remove the broken handler after page loads
setTimeout(function() {
    const adminLinks = document.getElementsByTagName('a');
    for (let link of adminLinks) {
        if (link.onclick && link.onclick.toString().includes('showLoginModal')) {
            link.onclick = null;
            link.href = "#";
        }
    }
}, 100);
