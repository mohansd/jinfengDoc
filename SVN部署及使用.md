# SVN

## SVN Introduce

待补充

## Subversion Deploy

### Ubuntu apt install

```shell
sudo apt install subversion
```

## SVN Configure

### create repository

```shell
sudo mkdir -r /home/svn/repo
sudo chmod -R 777 /home/svn/repo
sudo svnadmin create /home/svn/repo
```

### Use With SVNserver

1. Configure

After "svnadmin", there are "svnserve.conf", "authz" and "passwd" in /home/svn/repo/conf

- svnserve.conf

```shell
# 取消下列项注释, 如果无, 则添加下列项内容
# 未登录用户权限, none不可读, read可读, write可读可写
anon-access = read（可改成none，即不可读）
# 登录用户权限, 同上
auth-access = write
# 指定用户名密码文件
password-db = passwd
# 指定权限控制文件
authz-db = authz
```

- passwd

```shell
# 用户=密码
# 密码使用明文
[users]
admin=admin
test=123
```

- authz

```shell
# 用户组=用户1,用户2
# 用户必须在passwd中定义过
[groups]
test=test
all=admin,test

# 路径
[/]
# @用户组=''/rw/r
# 用户=''/rw/r
# rw为可读可写, r为可读, ''为不可读
# 目录权限采取继承制, 子目录可以继承父目录定义过的权限
# 子目录也可以通过重新定义, 覆盖权限
@test =
admin = rw
```

2. start serve

```shell
sudo svnserve -d -r /home/svn/repo
```

3. connect to svn serve: svn://ip/{root from /home/svn/repo}

4. stop the serve

```shell
sudo killall svnserve
```

### Use With Apache

#### Source Code Install

- Download from subversion homepage, "subversion-x.x.x.tar.gz"
- Unzip and install

```shell
sudo tar -zxvf subversion-x.x.x.tar.gz
cd subversion-x.x.x
./configure
sudo make
sudo make install
```

#### Install Apache2.4 (suit with subversion 1.9)

```shell
sudo apt-get install apache libapache2-svn -y
```

#### Configure apache

- create /etc/apache2/site-available/svn.conf and add content below

```html
<VirtualHost *:5888>
  ServerAdmin administrator@mail.com
  DocumentRoot "/home/svn/repo"
</VirtualHost>
```

- edite /etc/apache2/mods-available/dav_svn.conf (if can not work, remove \<IfModule mod_authz_svn.c\> and \<LimitExcept\>)

```html
<Location /svn>
  DAV svn
  SVNPath /home/svn/repo
  AuthType Basic
  AuthName "Welcome to SVN, But you need login first!"
  <IfModule mod_authz_svn.c>
    AuthzSVNAccessFile /etc/subversion/authz
  </IfModule>
  <LimitExcept GET PROPFIND OPTIONS REPORT>
    Require valid-user
  </LimitExcet>
</Location>
```

#### Configure svn

- create /etc/subversion/authz and add content below

```shell
# 用户组=用户1,用户2
# 用户必须在passwd中定义过
[groups]
test=test
all=admin,test

# 路径
[/]
# @用户组=''/rw/r
# 用户=''/rw/r
# rw为可读可写, r为可读, ''为不可读
# 目录权限采取继承制, 子目录可以继承父目录定义过的权限
# 子目录也可以通过重新定义, 覆盖权限
@test =
admin = rw
```

- create user with htpasswd

```shell
# -c参数首次创立文件使用(即覆盖文件)
sudo htpasswd [-c] /etc/subversion/passwd {username} {passwd}
```

## SVN Command

待补充
