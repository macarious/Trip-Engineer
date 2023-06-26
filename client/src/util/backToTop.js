// This function is used to scroll to the top of the page when the user clicks on the back to top button
export default function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}