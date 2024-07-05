<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240704161011 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE dry_goods_live ADD abandoned_boat_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE dry_goods_live ADD CONSTRAINT FK_4FAA7DE62F231498 FOREIGN KEY (abandoned_boat_id) REFERENCES dry_goods_live (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_4FAA7DE62F231498 ON dry_goods_live (abandoned_boat_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE dry_goods_live DROP FOREIGN KEY FK_4FAA7DE62F231498');
        $this->addSql('DROP INDEX UNIQ_4FAA7DE62F231498 ON dry_goods_live');
        $this->addSql('ALTER TABLE dry_goods_live DROP abandoned_boat_id');
    }
}
