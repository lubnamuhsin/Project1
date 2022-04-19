module.exports = {
    extends: "semantic-release-monorepo",
    branches: "master",
    repositoryUrl: "https://github.com/NadaMusthafa/project1.git",
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        ['@semantic-release/github', {
            assets: [
                {path: "Node_build.zip", label: "Node_Build"},
             ]
        }]
    ]
}
