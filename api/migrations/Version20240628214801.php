<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240628214801 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE dry_goods_live ADD employee_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE dry_goods_live ADD CONSTRAINT FK_4FAA7DE69749932E FOREIGN KEY (employee_id_id) REFERENCES employee (id)');
        $this->addSql('CREATE INDEX IDX_4FAA7DE69749932E ON dry_goods_live (employee_id_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE dry_goods_live DROP FOREIGN KEY FK_4FAA7DE69749932E');
        $this->addSql('DROP INDEX IDX_4FAA7DE69749932E ON dry_goods_live');
        $this->addSql('ALTER TABLE dry_goods_live DROP employee_id_id');
    }
}
