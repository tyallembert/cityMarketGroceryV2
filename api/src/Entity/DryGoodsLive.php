<?php

namespace App\Entity;

use App\Repository\DryGoodsLiveRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: DryGoodsLiveRepository::class)]
class DryGoodsLive
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups("dryGoodsLive")]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups("dryGoodsLive")]
    private ?string $aisle = null;

    #[ORM\Column]
    #[Groups("dryGoodsLive")]
    private ?int $boxCount = null;

    #[ORM\Column]
    #[Groups("dryGoodsLive")]
    private ?int $toteCount = null;

    #[ORM\Column(length: 100)]
    #[Groups("dryGoodsLive")]
    private ?string $type = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups("dryGoodsLive")]
    private ?\DateTimeInterface $startTime = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups("dryGoodsLive")]
    private ?\DateTimeInterface $endTime = null;

    #[ORM\Column(length: 50)]
    #[Groups("dryGoodsLive")]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'dryGoodsLives')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups("dryGoodsLive")]
    private ?Employee $employeeId = null;

    #[ORM\OneToOne(targetEntity: self::class, inversedBy: 'abandonedBoat', cascade: ['persist', 'remove'])]
    // #[Groups("dryGoodsLive")]
    private ?self $abandonedBoat = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAisle(): ?string
    {
        return $this->aisle;
    }

    public function setAisle(string $aisle): static
    {
        $this->aisle = $aisle;

        return $this;
    }

    public function getBoxCount(): ?int
    {
        return $this->boxCount;
    }

    public function setBoxCount(int $boxCount): static
    {
        $this->boxCount = $boxCount;

        return $this;
    }

    public function getToteCount(): ?int
    {
        return $this->toteCount;
    }

    public function setToteCount(int $toteCount): static
    {
        $this->toteCount = $toteCount;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): static
    {
        $this->type = $type;

        return $this;
    }

    public function getStartTime(): ?\DateTimeInterface
    {
        return $this->startTime;
    }

    public function setStartTime(\DateTimeInterface $startTime): static
    {
        $this->startTime = $startTime;

        return $this;
    }

    public function getEndTime(): ?\DateTimeInterface
    {
        return $this->endTime;
    }

    public function setEndTime(?\DateTimeInterface $endTime): static
    {
        $this->endTime = $endTime;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getEmployeeId(): ?Employee
    {
        return $this->employeeId;
    }

    public function setEmployeeId(?Employee $employeeId): static
    {
        $this->employeeId = $employeeId;

        return $this;
    }

    public function getAbandonedBoat(): ?self
    {
        return $this->abandonedBoat;
    }

    public function setAbandonedBoat(?self $abandonedBoat): static
    {
        $this->abandonedBoat = $abandonedBoat;

        return $this;
    }
}
