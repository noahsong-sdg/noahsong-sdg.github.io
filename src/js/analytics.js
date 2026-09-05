document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href]");

  if (!link || !window.posthog) {
    return;
  }

  const destination = new URL(link.href, window.location.href);
  const properties = {
    destination_url: destination.href,
    link_text: link.textContent.trim(),
    page_path: window.location.pathname,
  };

  if (destination.pathname.toLowerCase().endsWith(".pdf")) {
    window.posthog.capture("pdf_downloaded", {
      ...properties,
      file_name: destination.pathname.split("/").pop(),
    });
    return;
  }

  if (
    ["http:", "https:"].includes(destination.protocol) &&
    destination.origin !== window.location.origin
  ) {
    window.posthog.capture("outbound_link_clicked", properties);
  }
});
