export const middleStyle = {
    width: '300px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}

export const extractUrlAndId = (cloudinaryUrl) => {
    const lastSlashIndex = cloudinaryUrl.lastIndexOf('/')
    const url = cloudinaryUrl.substring(0, lastSlashIndex)
    const id = cloudinaryUrl.substring(lastSlashIndex + 1)
    return { url, id }
}

export const sanitizeUrl = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent || ""
}