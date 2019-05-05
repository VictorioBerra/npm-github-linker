if (window.location.href.endsWith("package.json")) {



    fetch('https://raw.githubusercontent.com/' + window.location.href.match(/github.com\/(.*package\.json$)/i)[1].replace('blob/', ''))
        .then(function (response) {
            return response.json();
        })
        .then(function (packageJson) {
            var dependencies = packageJson.dependencies ? Object.keys(packageJson.dependencies) : [];
            var devDependencies = packageJson.devDependencies ? Object.keys(packageJson.devDependencies) : [];
            var peerDependencies = packageJson.peerDependencies ? Object.keys(packageJson.peerDependencies) : [];

            if (dependencies) {
                ;

                let allDeps = dependencies.concat(devDependencies, peerDependencies);

                var finalList = document.createElement('ul');

                for (let index = 0; index < allDeps.length; index++) {
                    const dependency = allDeps[index];
                    const url = 'https://www.npmjs.com/' + dependency;

                    fetch('https://cors-anywhere.herokuapp.com/registry.npmjs.com/' + dependency)
                        .then(function (response) {
                            return response.json();
                        })
                        .catch(function (err) {
                            console.warn('Could not get NPM package data, tooltips disabled.');
                            return {
                                description: ''
                            };
                        })
                        .then(function (packageMetaJson) {

                            var description = packageMetaJson.description;

                            let anchor = document.createElement('a');
                            anchor.setAttribute('href', url);
                            anchor.textContent = dependency;
                            anchor.title = description;

                            let listItem = document.createElement('li');
                            listItem.appendChild(anchor);

                            finalList.appendChild(listItem);

                        })

                }

                var blobContainer = document.getElementsByClassName('blob-wrapper')[0];
                blobContainer.appendChild(finalList);
            }


        });

}