alias ll="ls -la"
alias l="ls -lah"

#PROMPT='%n@%m %1~ %# ' # default ZSH prompt
PROMPT='%(?.%F{blue}√.%F{yellow}×)%f %(!.%F{red}%n@%m%f.%F{green}%n@%m%f) %B%F{240}%~%f%b %(!.%F{red}%#%f.%F{green}%#%f) '
RPROMPT='%F{240}%*%f'