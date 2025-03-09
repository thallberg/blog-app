const API_URL = "https://dummyjson.com";

export const BlogService = {

    async getPosts() {
        const response = await fetch(`${API_URL}/posts?limit=4`);
        const data = await response.json();
        return data.posts; // Returnerar endast arrayen med inlägg
    },

    async getComments() {
        const response = await fetch(`${API_URL}/comments?limit=50`);
        const data = await response.json();
        return data.comments; // Returnerar endast arrayen med kommentarer
    },

    async getUsers() {
        const response = await fetch(`${API_URL}/users?limit=150`);
        const data = await response.json();
        return data.users; // Returnerar endast arrayen med användare
    },

    async getPostWithCommentsAndUser(postId) {
        try {
            // Direkta API-anrop för att hämta specifik post och dess användare
            const postResponse = await fetch(`${API_URL}/posts/${postId}`);
            const post = await postResponse.json();
            
            if (!post || post.message) return null; // Kontrollera om posten existerar
            
            // Hämta användarinformation direkt med användar-ID från inlägget
            const userResponse = await fetch(`${API_URL}/users/${post.userId}`);
            const userData = await userResponse.json();
            
            // Hämta kommentarer för det specifika inlägget
            const commentsResponse = await fetch(`${API_URL}/comments/post/${postId}`);
            const commentsData = await commentsResponse.json();
            
            // Välj 2-5 slumpmässiga kommentarer om det finns tillräckligt många
            let postComments = commentsData.comments || [];
            if (postComments.length > 5) {
                // Slumpa fram 2-5 kommentarer
                postComments = postComments
                    .sort(() => 0.5 - Math.random())
                    .slice(0, Math.floor(Math.random() * 4) + 2);
            } else if (postComments.length < 2) {
                // Hämta några generella kommentarer om det inte finns tillräckligt många
                const generalCommentsResponse = await fetch(`${API_URL}/comments?limit=10`);
                const generalCommentsData = await generalCommentsResponse.json();
                const additionalComments = generalCommentsData.comments
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 5 - postComments.length)
                    .map(comment => ({
                        ...comment,
                        postId: Number(postId) // Ändra postId för att koppla till detta inlägg
                    }));
                
                postComments.push(...additionalComments);
            }
            
            // Lägg till användar- och kommentarsinformation till inlägget
            post.comments = postComments;
            
            if (userData && !userData.message) {
                post.user = userData.username;
                post.userInfo = {
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    image: userData.image
                };
            } else {
                console.log(`Kunde inte hämta användardata för userId ${post.userId}`);
                post.user = "Unknown";
            }
            
            return post;
            
        } catch (error) {
            console.error("Fel vid hämtning av inlägg med kommentarer och användare:", error);
            return null;
        }
    }
};

