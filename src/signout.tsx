export function Signout() {
    const signOut = () => {
        fetch('/api/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            location.replace('/');
        })
        .catch(err => {
                console.log('er: ', err);
            });
    }        
    return <div>
                <img src="/signout.png" alt="empty" id="signout" onClick={signOut}/>
            </div>
}