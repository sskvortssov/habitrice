<!-- <h1><b>Habitrice</b> – app for your self-development</h1>

<h2>Contents</h2>
<ul>
  <li>
    <a href="#summary">Summary</a>
    <ul>
      <li>
        <a href="#sources">Sources</a>
      </li>
    </ul>
  </li>
</ul>

<h2 name="summary">Summary</h2>

<h3 name="sources">Sources</h3>
<ul>
  <li>
    <a href="https://habitrice.diayuokaro.dev/">Demo</a>
  </li>
  <li>
    <a href="https://github.com/Central-University-IT-prod/frontend-Diayuokaro">Source code</a>
  </li>
</ul> -->

<h1 id="title">**Habitrice** – app for your personal development</h1>

<h2 id="contents">Contents</h2>

- [**Habitrice** – app for your personal development](#title)
  - [Contents](#contents)
  - [Summary](#summary)
    - [Sources](#summary_sources)
  - [How to setup?](#how-to-setup)
    - [Preflight](#how-to-setup_preflight)
      - [Install NVM(Node Version Manager)](#how-to-setup_install-nvm)
        - [For Linux](#how-to-setup_install-nvm_for-linux)
        - [For Windows](#how-to-setup_install-nvm_for-windows)
    - [Setup](#how-to-setup_setup)

<h2 id="summary">Summary</h2>

<h3 id="summary_sources">Sources</h3>

- [Demo](https://habitrice.diayuokaro.dev/)
- [Source code](https://github.com/Central-University-IT-prod/frontend-Diayuokaro)

<h2 id="how-to-setup">How to setup?</h2>

<h3 id="how-to-setup_preflight">Preflight</h3>

<h3 id="how-to-setup_install-nvm">Install NVM(Node Version Manager)</h3>

<h4 id="how-to-setup_install-nvm_for-linux">For Linux:</h4>

Run

```Bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

or

```Bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Сheck for NVM works by run `nvm -v` or `command -v nvm` commands and follow next instructions if previous commands did gives you responses like this `nvm: command not found`.

Reopen your terminal or run following commands for different shells in your terminal:

*bash*: `source ~/.bashrc`

*zsh*: `source ~/.zshrc`

*ksh*: `. ~/.profile`

<h4 id="how-to-setup_install-nvm_for-windows">For Windows:</h4>

Take [this link](https://github.com/coreybutler/nvm-windows/releases) and download latest version of `nvm-setup.exe` from `Assets` field. Run downloaded file and following they instructions.

<h3 id="how-to-setup_setup">Setup</h3>

```Bash
git clone https://github.com/Central-University-IT-prod/frontend-Diayuokaro
cd ./frontend-Diayuokaro
yarn
```

```Bash
yarn run build
yarn run preview
```
