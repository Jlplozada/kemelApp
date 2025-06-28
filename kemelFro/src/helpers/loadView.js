export const loadView = async (element, hash) => { 
    const response = await fetch(`./src/views/${hash}`);
    const html = await response.text();
    element.innerHTML = html;
}