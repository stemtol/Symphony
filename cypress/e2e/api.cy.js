describe('Automated API Test', () => {
    let totalPosts;
    let newPostId;

    it('Read Total Number of Posts and Store in a Variable', () => {
        cy.request('GET', '/posts').then((response) => {
            expect(response.status).to.eq(200);
            totalPosts = response.body.length;
        });
    });

    it('Create a New Post and Store its ID', () => {
        cy.request('POST', '/posts', {
            title: 'foo',
            body: 'bar',
            userId: 1
        }).then((response) => {
            expect(response.status).to.eq(201);
            newPostId = response.body.id;
        });
    });

    it('Get Only the Created Post by ID', () => {
        cy.request('GET', `/posts/${newPostId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.eq(newPostId);
        });
    });

    it('Replace Some Field in the Created Post with PATCH', () => {
        cy.request('PATCH', `/posts/${newPostId}`, {
            title: 'updated title'
        }).then((response) => {
            expect(response.status).to.eq(200);
        });

        cy.request('GET', `/posts/${newPostId}`).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.title).to.eq('updated title');
        });
    });

    it('Delete the Created Post by ID', () => {
        cy.request('DELETE', `/posts/${newPostId}`).then((response) => {
            expect(response.status).to.eq(200);
        });

        cy.request({
            method: 'GET',
            url: `/posts/${newPostId}`,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });

    it('Check the Number of Posts to Ensure Integrity', () => {
        cy.request('GET', '/posts').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.length).to.eq(totalPosts);
        });
    });
});
