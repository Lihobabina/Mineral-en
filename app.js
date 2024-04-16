

const details = document.querySelectorAll("details");

const isSummary = (item) => {
    return item.tagName === "SUMMARY";
};

const clickHandler = (event) => {
    const duration = 0.3;
    const summary = event.currentTarget;
    if (!isSummary(summary)) return;

    const details = summary.parentElement;

    if (!(details instanceof HTMLDetailsElement)) {
        return;
    }

    const action = details.open ? "to" : "from";
    let closeOnCompletion = false;

    if (details.open) {
        closeOnCompletion = true;
        event.preventDefault();
    }

    const height = details.open ? summary.offsetHeight + 1 : details.clientHeight;

    gsap[action](details, {
        duration,
        height,
        onComplete: () => {
            if (closeOnCompletion) details.open = false;
            gsap.set(details, { clearProps: "all" });
        }
    });
};

const augment = (details) => {
    const summary = details.querySelector("summary");
    summary.addEventListener("click", clickHandler);
};

details.forEach(detail => {
    augment(detail);
});
// 
