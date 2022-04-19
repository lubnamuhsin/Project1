module.exports = {
    extends: "semantic-release-monorepo",
    branches: "master",
    repositoryUrl: "https://github.com/NadaMusthafa/project1.git",
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        ['@semantic-release/github', {
            assets: [
                 {path: "React_build.zip", label: "React_build"}
                ]
        }]
    ]
}
